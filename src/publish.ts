import path from 'node:path';
import { URLSearchParams } from 'node:url';
import { chromium, Page } from 'playwright-chromium';
import type { Options } from './options.js';

const foundryBaseURL = 'https://foundryvtt.com/';

export async function publish(options: Options): Promise<void> {
  console.log(`Publishing Foundry VTT package with id '${options.packageID}'.`);
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await login(page, options);
    await updatePackage(page, options);
  } finally {
    await browser.close();
  }
}

async function login(page: Page, { username, password }: Options) {
  console.log('Trying to login...');
  await page.goto(foundryBaseURL, { waitUntil: 'load' });
  await page.click('[for="modal-login-trigger"]');
  await page.fill('[name="login_username"]', username);
  await page.fill('[name="login_password"]', password);
  await page.click('#login-login');
  await page.waitForSelector('#login-welcome');
  console.log('Login successful.');
}

async function updatePackage(page: Page, options: Options) {
  console.log('Trying to update the package...');
  await page.goto(path.join(foundryBaseURL, `admin/packages/package/${options.packageID}/change/`));

  const id = await page.locator('tr.dynamic-versions:not(.has_original)').evaluate((e) => e.id);

  await page.fill(`#id_${id}-version`, options.packageVersion);
  await page.fill(`#id_${id}-manifest`, options.manifestURL);
  if (options.changelogURL !== undefined) {
    await page.fill(`#id_${id}-notes`, options.changelogURL);
  }
  await page.fill(`#id_${id}-required_core_version`, options.minimumCoreVersion);
  await page.fill(`#id_${id}-compatible_core_version`, options.compatibleCoreVersion);

  if (options.deleteObsoleteVersions) {
    await checkDeleteCheckboxes(page, options);
  }

  if (isDevelopment()) {
    await page.route('**/*', (route) => {
      const request = route.request();
      route.abort();
      return console.log('Request', request.url(), new URLSearchParams(request.postData() ?? ''));
    });
  }

  const promises: Promise<unknown>[] = [];
  if (!isDevelopment()) {
    promises.push(page.waitForNavigation({ waitUntil: 'load' }));
  }
  promises.push(page.click('[name="_continue"]'));
  await Promise.all(promises);

  console.log('Package updated successfully.');
}

async function checkDeleteCheckboxes(page: Page, { compatibleCoreVersion }: Options) {
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
      compatibleCoreVersion,
    );
  for (const versionId of versionIds) {
    await page.click(`#id_${versionId}-DELETE`);
  }
}

function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}
