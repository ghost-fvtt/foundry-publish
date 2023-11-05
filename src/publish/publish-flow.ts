// SPDX-FileCopyrightText: 2023 Johannes Loher
//
// SPDX-License-Identifier: MIT

import path from 'node:path';
import { chromium, type Dialog, type Page } from 'playwright-chromium';
import type { Options } from '../options';

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
    await publishPackage(page, options);
    await deleteObsoleteVersions(page, options);
  } finally {
    await browser.close();
  }
}

async function login(page: Page, { username, password }: Options) {
  console.log('Logging in…');
  await page.goto(foundryBaseURL);
  await page.locator('.dropdown-toggle[for="login-toggle"]').click();
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText(`You are now logged in as ${username}!`).isVisible();
  console.log('Login successful.');
}

async function publishPackage(page: Page, options: Options) {
  console.log('Publishing package…');
  await page.goto(getPackageURL(options));
  await page.getByRole('button', { name: 'Add' }).click();
  await page.locator('#id_version').fill(options.packageVersion);
  await page.locator('#id_manifest').fill(options.manifestURL);
  if (options.changelogURL !== undefined) {
    await page.locator('#id_notes').fill(options.changelogURL);
  }
  await page.locator('#id_required_core_version').fill(options.minimumCoreVersion);
  await page.locator('#id_compatible_core_version').fill(options.verifiedCoreVersion);
  if (options.maximumCoreVersion !== undefined) {
    await page.locator('#id_maximum_core_version').fill(options.maximumCoreVersion);
  }

  if (options.dryRun) {
    await page.route('**/*', (route) => {
      const request = route.request();
      if (request.method() !== 'GET') {
        console.log('Request', request.url(), new URLSearchParams(request.postData() ?? ''));
        return route.continue({ method: 'GET', postData: undefined });
      } else {
        return route.continue();
      }
    });
  }

  await page.locator('#save').click();
  await page.waitForURL(getPackageURL(options));

  const errors = await page.locator('ul.errorlist li').evaluateAll((li) => li.map((element) => element.textContent));
  if (errors.length > 0) {
    throw new Error(`Errors while publishing package:\n${errors.join('\n')}`);
  }

  console.log('Package published successfully.');
}

async function deleteObsoleteVersions(page: Page, options: Options) {
  if (options.deleteObsoleteVersions) {
    console.log('Deleting obsolete versions…');
    await page.goto(getPackageURL(options));
    const versionsToDelete = await page
      .locator('div.version')
      .evaluateAll(
        (elements, { packageVersion, verifiedCoreVersion }) =>
          elements
            .filter(
              (e) =>
                e.id !== packageVersion &&
                e.querySelectorAll<HTMLDivElement>('.foundry-version')[1]?.innerText === verifiedCoreVersion,
            )
            .map((e) => e.id),
        options,
      );
    console.log(versionsToDelete);

    const accept = (dialog: Dialog) => dialog.accept();
    page.on('dialog', accept);
    for (const version of versionsToDelete) {
      console.log(`Deleting version ${version}…`);
      await page.locator(`[id="${version}"]`).locator('button[name=delete-version]').click();
    }
    page.off('dialog', accept);
    console.log('Obsolete versions deleted successfully.');
  }
}

function getPackageURL(options: Options): string {
  return path.join(foundryBaseURL, `/packages/${options.packageID}/edit`);
}
