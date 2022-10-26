// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import path from 'path';
import fs from 'fs';

import { rootPath } from './file-utils.js';

export const version: string = JSON.parse(fs.readFileSync(path.resolve(rootPath, 'package.json')).toString()).version;
