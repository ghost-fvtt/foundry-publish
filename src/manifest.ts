import * as t from 'io-ts';

const PackageCompatibility = t.partial({
  minimum: t.string,
  verified: t.string,
  maximum: t.string,
});

export const Manifest = t.partial({
  changelog: t.string,
  version: t.string,
  minimumCoreVersion: t.string,
  compatibleCoreVersion: t.string,
  compatibility: PackageCompatibility,
  manifest: t.string,
});
