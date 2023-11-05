#!/usr/bin/env node

// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { Command } from 'commander';
import { type CLIOptions, processOptions, validateOptions } from './options.js';
import { publish } from './publish/publish.js';

import { version } from './utils/version.js';

const program = new Command();

program
  .version(version, '-v, --version', 'Show the version number of Foundry Publish')
  .option('--changelogURL <url>', 'The URL of the changelog of the package version being published')
  .option(
    '--deleteObsoleteVersions',
    'Delete obsolete versions, i.e., all versions with the same verified core version as the version being published',
  )
  .option('--dryRun', 'Just perform a dry run instead of actually publishing the package')
  .option('--headed', 'Run in headed mode, to be able to see the browser interaction')
  .option('--manifestURL <url>', 'The URL of the manifest of the package version being published')
  .option('--manifestPath <path>', 'A path to a manifest file to read information from')
  .option(
    '--maximumCoreVersion <version>',
    'The maximum version of the core Foundry software which is allowed to use the package',
  )
  .option(
    '--minimumCoreVersion <version>',
    'The minimum version of the core Foundry software which is required to use the package',
  )
  .option('--packageID <id>', 'The numeric ID of the package')
  .option('--packageVersion <version>', 'The version of the package')
  .option(
    '--useNewPackageAdministrationInterface',
    'Use the new package administration interface to publish the version',
  )
  .option(
    '--username <username>',
    'The username of the account for accessing the FoundryVTT administration page (you may need to use the email address)',
  )
  .option(
    '--compatibleCoreVersion, --verifiedCoreVersion <version>',
    'The maximum version of the core Foundry software for which compatibility of the package has been verified',
  )
  .action(async (options: CLIOptions, program: Command) => {
    const processedOptions = processOptions(options);
    validateOptions(processedOptions, program);
    await publish(processedOptions);
  });

program.parse(process.argv);
