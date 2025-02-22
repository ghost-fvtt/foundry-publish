// SPDX-FileCopyrightText: 2025 Johannes Loher
//
// SPDX-License-Identifier: MIT

// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**'] },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'commitlint.config.js',
            'eslint.config.js',
            'lint-staged.config.js',
            'prettier.config.js',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  eslintConfigPrettier,
);
