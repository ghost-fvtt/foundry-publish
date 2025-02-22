// SPDX-FileCopyrightText: 2023 Johannes Loher
//
// SPDX-License-Identifier: MIT

import type { Options } from './options';

export async function publish(options: Options): Promise<void> {
  if (options.dryRun) {
    console.log(`Performing a dry run of publishing Foundry VTT package with id '${options.packageID}'.`);
  } else {
    console.log(`Publishing Foundry VTT package with id '${options.packageID}'.`);
  }

  const response = await fetch('https://api.foundryvtt.com/_api/packages/release_version/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: options.token,
    },
    method: 'POST',
    body: JSON.stringify({
      id: options.packageID,
      'dry-run': options.dryRun,
      release: {
        version: options.packageVersion,
        manifest: options.manifestURL,
        notes: options.changelogURL,
        compatibility: {
          minimum: options.minimumCoreVersion,
          verified: options.verifiedCoreVersion,
          maximum: options.maximumCoreVersion,
        },
      },
    }),
  });

  const body = options.dryRun ? undefined : await response.json();

  if (!response.ok) {
    throw new HttpError(response.status, body);
  }

  if (options.dryRun) {
    console.log('Dry run completed successfully.');
  } else {
    console.log('Package published successfully.');
  }
}

class HttpError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(status: number, body: unknown) {
    super();
    this.status = status;
    this.body = body;
    this.name = 'HttpError';
  }

  get message(): string {
    return JSON.stringify({ status: this.status, body: this.body }, undefined, 2);
  }
}
