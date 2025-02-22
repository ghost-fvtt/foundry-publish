// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

import { rootPath } from './file-utils.js';
import { z } from 'zod';

const PackageJSON = z.object({ version: z.string() });

export const { version } = PackageJSON.parse(JSON.parse(readFileSync(resolve(rootPath, 'package.json')).toString()));
