import puppeteer from 'puppeteer';
import { decode } from 'querystring';
import type { Options } from './options.js';

const foundryBaseURL = 'https://foundryvtt.com';

export async function publish(options: Options): Promise<void> {
  console.log(`Publishing Foundry VTT package with id '${options.packageID}'.`);
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await login(page, options);
    await updatePackage(page, options);
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
  }
}

async function login(page: puppeteer.Page, { username, password }: Options) {
  console.log('Trying to login...');
  await page.goto(foundryBaseURL, { waitUntil: 'load' });
  await page.click('[for="modal-login-trigger"]');
  await editField(page, '[name="login_username"]', username);
  await editField(page, '[name="login_password"]', password);
  await page.click('#login-login');
  await page.waitForSelector('#login-welcome');
  console.log('Login successful.');
}

async function updatePackage(page: puppeteer.Page, options: Options) {
  console.log('Trying to update the package...');
  await page.goto(`${foundryBaseURL}/admin/packages/package/${options.packageID}/change/`);
  const id = await page.$eval('tr.dynamic-versions:not(.has_original)', (e) => e.id);

  await editField(page, `#id_${id}-version`, options.packageVersion);
  await editField(page, `#id_${id}-manifest`, options.manifestURL);
  if (options.changelogURL !== undefined) {
    await editField(page, `#id_${id}-notes`, options.changelogURL);
  }
  await editField(page, `#id_${id}-required_core_version`, options.minimumCoreVersion);
  await editField(page, `#id_${id}-compatible_core_version`, options.compatibleCoreVersion);

  if (process.env.NODE_ENV === 'development') {
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      request.abort();
      console.log('Request', request.url(), decode(request.postData() ?? ''));
    });
  }

  await page.click('[name="_continue"]');
  if (process.env.NODE_ENV !== 'development') {
    await page.waitForNavigation({ waitUntil: 'load' });
  }
  console.log('Package updated successfully.');
}

async function editField(page: puppeteer.Page, selector: string, value: string) {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    element.value = '';
  }, selector);
  await page.type(selector, value);
}
