// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { z } from 'zod';

const Version = z.string().or(z.number().transform((v) => v.toString()));

const Compatibility = z.object({
  minimum: Version.optional(),
  verified: Version.optional(),
  maximum: Version.optional(),
});

export const Manifest = z.object({
  id: z.string().optional(),
  changelog: z.string().optional(),
  version: Version.optional(),
  minimumCoreVersion: Version.optional(),
  compatibleCoreVersion: Version.optional(),
  compatibility: Compatibility.optional(),
  manifest: z.string().optional(),
});
export type Manifest = z.infer<typeof Manifest>;

export const ManifestFromString = z
  .string()
  .transform((v) => JSON.parse(v))
  .pipe(Manifest);
