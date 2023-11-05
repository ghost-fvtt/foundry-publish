// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import path from 'node:path';
import { URLSearchParams } from 'node:url';
import { chromium, type Page } from 'playwright-chromium';
import type { Options } from '../options.js';

const foundryBaseURL = 'https://foundryvtt.com/';

export async function publish(options: Options): Promise<void> {
  if (options.dryRun) {
    console.log(`Performing a dry run of publishing Foundry VTT package with id '${options.packageID}'.`);
  } else {
    console.log(`Publishing Foundry VTT package with id '${options.packageID}'.`);
  }
  const browser = await chromium.launch({ headless: !options.headed });
  try {
    const page = await browser.newPage();
    await login(page, options);
    await updatePackage(page, options);
  } finally {
    await browser.close();
  }
}

async function login(page: Page, { username, password }: Options) {
  console.log('Trying to login…');
  await page.goto(path.join(foundryBaseURL, 'admin'), { waitUntil: 'load' });
  await page.fill('[name="username"]', username);
  await page.fill('[name="password"]', password);
  await page.click('input[type="submit"]');
  await page.waitForSelector('#user-tools:has-text("Welcome")');
  console.log('Login successful.');
}

async function updatePackage(page: Page, options: Options) {
  console.log('Trying to update the package…');
  await page.goto(getPackageURL(options));

  const id = await page.locator('tr.dynamic-versions:not(.has_original)').evaluate((e) => e.id);

  await page.fill(`#id_${id}-version`, options.packageVersion);
  await page.fill(`#id_${id}-manifest`, options.manifestURL);
  if (options.changelogURL !== undefined) {
    await page.fill(`#id_${id}-notes`, options.changelogURL);
  }
  await page.fill(`#id_${id}-required_core_version`, options.minimumCoreVersion);
  await page.fill(`#id_${id}-compatible_core_version`, options.verifiedCoreVersion);
  if (options.maximumCoreVersion !== undefined) {
    await page.fill(`#id_${id}-maximum_core_version`, options.maximumCoreVersion);
  }

  if (options.deleteObsoleteVersions) {
    console.log('Marking obsolete versions for deletion…');
    await checkDeleteCheckboxes(page, options);
  }

  if (options.dryRun) {
    await page.route('**/*', (route) => {
      const request = route.request();
      route.abort();
      return console.log('Request', request.url(), new URLSearchParams(request.postData() ?? ''));
    });
  }

  const promises: Promise<unknown>[] = [];
  if (!options.dryRun) {
    promises.push(page.waitForURL(getPackageURL(options)));
  }
  promises.push(page.click('[name="_continue"]'));
  await Promise.all(promises);

  const errors = await page.locator('ul.errorlist li').evaluateAll((li) => li.map((element) => element.textContent));
  if (errors.length > 0) {
    throw new Error(`Errors while updating package:\n${errors.join('\n')}`);
  }

  console.log('Package updated successfully.');
}

async function checkDeleteCheckboxes(page: Page, { verifiedCoreVersion }: Options) {
  const versionIds = await page
    .locator('tr.dynamic-versions.has_original')
    .evaluateAll(
      (elements, compatibleCoreVersion) =>
        elements
          .filter(
            (e) =>
              e.querySelector<HTMLInputElement>(`#id_${e.id}-compatible_core_version`)?.value === compatibleCoreVersion,
          )
          .map((e) => e.id),
      verifiedCoreVersion,
    );
  for (const versionId of versionIds) {
    const version = await page.inputValue(`#id_${versionId}-version`);
    await page.click(`#id_${versionId}-DELETE`);
    console.log(`Marked version ${version} for deletion.`);
  }
}

function getPackageURL(options: Options): string {
  return path.join(foundryBaseURL, `admin/packages/package/${options.packageID}/change/`);
}
