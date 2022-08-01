import { chain, orElseW } from 'fp-ts/lib/Either.js';
import { identity, pipe } from 'fp-ts/lib/function.js';
import * as t from 'io-ts';
import { JsonFromString } from 'io-ts-types';

const Version = new t.Type<string>(
  'Version',
  t.string.is,
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      orElseW(() => t.number.validate(u, c)),
      chain((sn) => t.success(sn.toString())),
    ),
  identity,
);

const Compatibility = t.partial(
  {
    minimum: Version,
    verified: Version,
    maximum: Version,
  },
  'Compatibility',
);

export const Manifest = t.partial(
  {
    changelog: t.string,
    version: Version,
    minimumCoreVersion: Version,
    compatibleCoreVersion: Version,
    compatibility: Compatibility,
    manifest: t.string,
  },
  'Manifest',
);
export type Manifest = t.TypeOf<typeof Manifest>;

export const ManifestFromString = new t.Type<Manifest, string, string>(
  'ManifestFromString',
  Manifest.is,
  (s, c) =>
    pipe(
      JsonFromString.validate(s, c),
      chain((j) => Manifest.validate(j, c)),
    ),
  (m) => JSON.stringify(m),
);
