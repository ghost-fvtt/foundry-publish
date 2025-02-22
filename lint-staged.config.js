// SPDX-FileCopyrightText: 2025 Johannes Loher
//
// SPDX-License-Identifier: MIT

// @ts-check

/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': ['eslint --fix', 'prettier --write'],
};
