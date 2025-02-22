// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

import { rootPath } from './file-utils.js';

export const version: string = JSON.parse(readFileSync(resolve(rootPath, 'package.json')).toString()).version;
