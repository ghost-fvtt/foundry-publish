// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import type { Command } from 'commander';
import { readFileSync } from 'fs';

import { Manifest, ManifestFromString } from './manifest.js';

export interface CLIOptions {
  changelogURL?: string;
  verifiedCoreVersion?: string;
  dryRun?: boolean;
  manifestURL?: string;
  manifestPath?: string;
  maximumCoreVersion?: string;
  minimumCoreVersion?: string;
  packageID?: string;
  packageVersion?: string;
}

const requiredOptionKeys = [
  'verifiedCoreVersion',
  'manifestURL',
  'minimumCoreVersion',
  'packageID',
  'packageVersion',
  'token',
] as const;

export type Options = { [Key in (typeof requiredOptionKeys)[number]]: string } & {
  changelogURL?: string;
  maximumCoreVersion?: string;
  dryRun?: boolean;
};

export function processOptions(cliOptions: CLIOptions): Partial<Options> {
  return mergeWithManifestIfNeeded(mergeWithEnvironmentVariables(cliOptions));
}

function mergeWithManifestIfNeeded(options: CLIOptions & Partial<Options>): Partial<Options> {
  const { manifestPath, ...remainingOptions } = options;
  if (manifestPath !== undefined) {
    const manifest = parseManifest(manifestPath);

    return deleteUndefinedKeys({
      changelogURL: manifest?.changelog,
      manifestURL: manifest?.manifest,
      maximumCoreVersion: manifest?.compatibility?.maximum,
      minimumCoreVersion: manifest?.compatibility?.minimum ?? manifest?.minimumCoreVersion,
      packageVersion: manifest?.version,
      verifiedCoreVersion: manifest?.compatibility?.verified ?? manifest?.compatibleCoreVersion,
      packageID: manifest?.id,
      ...remainingOptions,
    });
  }
  return remainingOptions;
}

function mergeWithEnvironmentVariables(options: CLIOptions): CLIOptions & Partial<Options> {
  return deleteUndefinedKeys({
    changelogURL: process.env.FVTT_CHANGELOG_URL,
    dryRun: process.env.FVTT_DRY_RUN !== undefined ? process.env.FVTT_DRY_RUN === 'true' : undefined,
    manifestURL: process.env.FVTT_MANIFEST_URL,
    manifestPath: process.env.FVTT_MANIFEST_PATH,
    maximumCoreVersion: process.env.FVTT_MAXIMUM_CORE_VERSION,
    minimumCoreVersion: process.env.FVTT_MINIMUM_CORE_VERSION,
    packageID: process.env.FVTT_PACKAGE_ID,
    packageVersion: process.env.FVTT_PACKAGE_VERSION,
    token: process.env.FVTT_TOKEN,
    verifiedCoreVersion: process.env.FVTT_VERIFIED_CORE_VERSION ?? process.env.FVTT_COMPATIBLE_CORE_VERSION,
    ...options,
  });
}

function parseManifest(manifestPath: string): Manifest | undefined {
  try {
    const manifestContent = readFileSync(manifestPath).toString();
    const { data, error, success } = ManifestFromString.safeParse(manifestContent);
    if (!success) {
      console.warn(`${manifestPath} is not a valid manifest file, ignoring it.`, error.format());
    }
    return data;
  } catch (e) {
    console.warn(`Could not read manifest file ${manifestPath}, ignoring it.`, e);
  }
}

function deleteUndefinedKeys<T extends object>(t: T): Partial<T> {
  const copy = { ...t };
  (Object.keys(copy) as (keyof T)[]).forEach((key) => copy[key] === undefined && delete copy[key]);
  return copy;
}

export function validateOptions(options: Partial<Options>, program: Command): asserts options is Options {
  for (const optionKey of requiredOptionKeys) {
    if (options[optionKey] === undefined) {
      console.error(`Missing option ${optionKey}.`);
      program.help({ error: true });
    }
  }
}
