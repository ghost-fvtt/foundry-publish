import type { Command } from 'commander';
import { readFileSync } from 'fs';

import { Manifest } from './manifest.js';

export interface CLIOptions {
  changelogURL?: string;
  compatibleCoreVersion?: string;
  manifestURL?: string;
  manifestPath?: string;
  minimumCoreVersion?: string;
  packageID?: string;
  packageVersion?: string;
  username?: string;
}

const optionalOptionKeys = ['changelogURL'] as const;

const requiredOptionKeys = [
  'compatibleCoreVersion',
  'manifestURL',
  'minimumCoreVersion',
  'packageID',
  'packageVersion',
  'username',
  'password',
] as const;

export type Options = { [Key in typeof requiredOptionKeys[number]]: string } & {
  [Key in typeof optionalOptionKeys[number]]?: string;
};

export function processOptions(cliOptions: CLIOptions): Partial<Options> {
  return mergeWithManifestIfNeeded(mergeWithEnvironmentVariables(cliOptions));
}

function mergeWithManifestIfNeeded(options: CLIOptions & Partial<Options>): Partial<Options> {
  const { manifestPath, ...remainingOptions } = options;
  if (manifestPath !== undefined) {
    const manifestValidation = Manifest.decode(JSON.parse(readFileSync(manifestPath).toString()));
    if (manifestValidation._tag === 'Right') {
      const { right: manifest } = manifestValidation;
      return deleteUndefinedKeys({
        changelogURL: manifest.changelog,
        compatibleCoreVersion: manifest.compatibleCoreVersion,
        manifestURL: manifest.manifest,
        minimumCoreVersion: manifest.minimumCoreVersion,
        packageVersion: manifest.version,
        ...remainingOptions,
      });
    } else {
      console.warn(`${manifestPath} is not a valid manifest file, ignoring it.`);
    }
  }
  return remainingOptions;
}

function mergeWithEnvironmentVariables(options: CLIOptions): CLIOptions & Partial<Options> {
  return deleteUndefinedKeys({
    changelogURL: process.env.FVTT_CHANGELOG_URL,
    compatibleCoreVersion: process.env.FVTT_COMPATIBLE_CORE_VERSION,
    manifestURL: process.env.FVTT_MANIFEST_URL,
    manifestPath: process.env.FVTT_MANIFEST_PATH,
    minimumCoreVersion: process.env.FVTT_MINIMUM_CORE_VERSION,
    packageID: process.env.FVTT_PACKAGE_ID,
    packageVersion: process.env.FVTT_PACKAGE_VERSION,
    username: process.env.FVTT_USERNAME,
    password: process.env.FVTT_PASSWORD,
    ...options,
  });
}

function deleteUndefinedKeys<T>(t: T): Partial<T> {
  const copy = { ...t };
  (Object.keys(copy) as (keyof T)[]).forEach((key) => copy[key] === undefined && delete copy[key]);
  return copy;
}

export function validateOptions(options: Partial<Options>, program: Command): options is Options {
  for (const optionKey of requiredOptionKeys) {
    if (options[optionKey] === undefined) {
      console.error(`Missing option ${optionKey}.`);
      program.help();
    }
  }
  console.log(options);
  return true;
}
