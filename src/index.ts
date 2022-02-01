#!/usr/bin/env node
import { Command } from 'commander';
import { CLIOptions, processOptions, validateOptions } from './options.js';
import { publish } from './publish.js';

import { version } from './utils/version.js';

const program = new Command();

program
  .version(version, '-v, --version', 'Show the version number of Foundry Publish')
  .option('--changelogURL <url>', 'The URL of the changelog of the package version being published')
  .option(
    '--compatibleCoreVersion <version>',
    'The maximum version of the core Foundry software beyond which compatibility of the package is not guaranteed',
  )
  .option(
    '--deleteObsoleteVersions',
    'Delete obsolete versions, i.e., all versions with the same compatible core version as the version being published',
  )
  .option('--manifestURL <url>', 'The URL of the manifest of the package version being published')
  .option('--manifestPath <path>', 'A path to a manifest file to read information from')
  .option(
    '--minimumCoreVersion <version>',
    'The minimum version of the core Foundry software which is required to use the package',
  )
  .option('--packageID <id>', 'The numeric ID of the package')
  .option('--packageVersion <version>', 'The version of the package')
  .option('--username <username>', 'The username of the account for accessing the FoundryVTT administration page')
  .action(async (options: CLIOptions, program: Command) => {
    const processedOptions = processOptions(options);
    validateOptions(processedOptions, program);
    await publish(processedOptions);
  });

program.parse(process.argv);
