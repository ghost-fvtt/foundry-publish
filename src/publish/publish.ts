// SPDX-FileCopyrightText: 2023 Johannes Loher
//
// SPDX-License-Identifier: MIT

import chalk from 'chalk';
import { publish as currentPublish } from './publish-flow.js';
import { publish as legacyPublish } from './legacy-publish-flow.js';

import type { Options } from '../options';

export async function publish(options: Options): Promise<void> {
  if (options.useNewPackageAdministrationInterface) {
    return currentPublish(options);
  } else {
    console.warn(
      chalk.yellow(
        chalk.bold('Warning:') +
          ' You are using the legacy flow for publishing a package version, which relies on the /admin section of the ' +
          'Foundry Virtual Tabletop website for package management. ' +
          chalk.bold('From December 6th, 2023, this will stop working.') +
          ' See https://discord.com/channels/170995199584108546/596076404618166434/1169350879334379611 for more details' +
          '.\n\nYou can opt into the new flow by providing the --useNewPackageAdministrationInterface command line ' +
          'option or setting the FVTT_USE_NEW_PACKAGE_ADMINISTRATION_INTERFACE environment variable to true. Note ' +
          'that when using the new flow, you need to use the the id from the manifest file as package id, instead of ' +
          'the numeric id from the /admin page. When using the new flow, this id is also read from the manifest ' +
          'file, if it is provided.\n',
      ),
    );
    return legacyPublish(options);
  }
}
