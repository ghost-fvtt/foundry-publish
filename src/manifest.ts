import * as t from 'io-ts';

export const Manifest = t.partial({
  changelog: t.string,
  version: t.string,
  minimumCoreVersion: t.string,
  compatibleCoreVersion: t.string,
  manifest: t.string,
});
