// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import type { Command } from 'commander';
import { chain, getOrElseW, tryCatch } from 'fp-ts/lib/Either.js';
import { pipe } from 'fp-ts/lib/function.js';
import { readFileSync } from 'fs';
import { failure } from 'io-ts/lib/PathReporter.js';

import { ManifestFromString } from './manifest.js';

export interface CLIOptions {
  changelogURL?: string;
  verifiedCoreVersion?: string;
  deleteObsoleteVersions?: boolean;
  dryRun?: boolean;
  manifestURL?: string;
  manifestPath?: string;
  maximumCoreVersion?: string;
  minimumCoreVersion?: string;
  packageID?: string;
  packageVersion?: string;
  username?: string;
}
const optionalStringOptionKeys = ['changelogURL', 'maximumCoreVersion'] as const;
const optionalBooleanOptionKeys = ['deleteObsoleteVersions', 'dryRun'] as const;

const requiredOptionKeys = [
  'verifiedCoreVersion',
  'manifestURL',
  'minimumCoreVersion',
  'packageID',
  'packageVersion',
  'username',
  'password',
] as const;

export type Options = { [Key in (typeof requiredOptionKeys)[number]]: string } & {
  [Key in (typeof optionalStringOptionKeys)[number]]?: string;
} & {
  [Key in (typeof optionalBooleanOptionKeys)[number]]?: boolean;
};

export function processOptions(cliOptions: CLIOptions): Partial<Options> {
  return mergeWithManifestIfNeeded(mergeWithEnvironmentVariables(cliOptions));
}

function mergeWithManifestIfNeeded(options: CLIOptions & Partial<Options>): Partial<Options> {
  const { manifestPath, ...remainingOptions } = options;
  if (manifestPath !== undefined) {
    const manifest = pipe(
      tryCatch(
        () => readFileSync(manifestPath).toString(),
        (e) => [{ context: [], value: manifestPath, message: (e as Error).message }],
      ),
      chain(ManifestFromString.decode),
      getOrElseW((es): void => {
        console.warn(`${manifestPath} is not a valid manifest file, ignoring it.`, failure(es));
      }),
    );

    return deleteUndefinedKeys({
      changelogURL: manifest?.changelog,
      manifestURL: manifest?.manifest,
      maximumCoreVersion: manifest?.compatibility?.maximum,
      minimumCoreVersion: manifest?.compatibility?.minimum ?? manifest?.minimumCoreVersion,
      packageVersion: manifest?.version,
      verifiedCoreVersion: manifest?.compatibility?.verified ?? manifest?.compatibleCoreVersion,
      ...remainingOptions,
    });
  }
  return remainingOptions;
}

function mergeWithEnvironmentVariables(options: CLIOptions): CLIOptions & Partial<Options> {
  return deleteUndefinedKeys({
    changelogURL: process.env.FVTT_CHANGELOG_URL,
    deleteObsoleteVersions:
      process.env.FVTT_DELETE_OBSOLETE_VERSIONS !== undefined
        ? process.env.FVTT_DELETE_OBSOLETE_VERSIONS === 'true'
        : undefined,
    dryRun: process.env.FVTT_DRY_RUN !== undefined ? process.env.FVTT_DRY_RUN === 'true' : undefined,
    manifestURL: process.env.FVTT_MANIFEST_URL,
    manifestPath: process.env.FVTT_MANIFEST_PATH,
    maximumCoreVersion: process.env.FVTT_MAXIMUM_CORE_VERSION,
    minimumCoreVersion: process.env.FVTT_MINIMUM_CORE_VERSION,
    packageID: process.env.FVTT_PACKAGE_ID,
    packageVersion: process.env.FVTT_PACKAGE_VERSION,
    password: process.env.FVTT_PASSWORD,
    username: process.env.FVTT_USERNAME,
    verifiedCoreVersion: process.env.FVTT_VERIFIED_CORE_VERSION ?? process.env.FVTT_COMPATIBLE_CORE_VERSION,
    ...options,
  });
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
      program.help();
    }
  }
}
