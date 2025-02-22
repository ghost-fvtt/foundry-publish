# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/ghost-fvtt/foundry-publish/compare/v3.0.1...v4.0.0) (2025-02-22)


### ⚠ BREAKING CHANGES

* * It’s not possible anymore to delete obsolete versions, the API unfortunately does not provide a
  deletion mechanism
* Instead of username and password, you now need to supply the package release token via
  `FVTT_TOKEN`. See https://foundryvtt.com/article/package-release-api/ for more details about the
  Package Release API
* Since the package is now published via a simple HTTP request, there is no headed mode anymore

### Features

* use Package Release API ([55199e1](https://github.com/ghost-fvtt/foundry-publish/commit/55199e10de4bf62859c202b482199bf49c52d6c9))

### [3.0.1](https://github.com/ghost-fvtt/foundry-publish/compare/v3.0.0...v3.0.1) (2025-02-22)


### Bug Fixes

* **deps:** update dependency chalk to v5.4.0 ([#1048](https://github.com/ghost-fvtt/foundry-publish/issues/1048)) ([aa2526c](https://github.com/ghost-fvtt/foundry-publish/commit/aa2526c8e361f37286c79c4092be1546598197dc))
* **deps:** update dependency chalk to v5.4.1 ([#1049](https://github.com/ghost-fvtt/foundry-publish/issues/1049)) ([f0cc992](https://github.com/ghost-fvtt/foundry-publish/commit/f0cc992f9405b4eafabe4df502cd59412fe30f52))
* **deps:** update dependency commander to v12 ([ac11617](https://github.com/ghost-fvtt/foundry-publish/commit/ac1161775d23022101fed6c3c2c0544596013a47))
* **deps:** update dependency commander to v12.1.0 ([6cc42ac](https://github.com/ghost-fvtt/foundry-publish/commit/6cc42acf224caf428c41db7671b9532b6136d385))
* **deps:** update dependency commander to v13 ([#1054](https://github.com/ghost-fvtt/foundry-publish/issues/1054)) ([96cf5f7](https://github.com/ghost-fvtt/foundry-publish/commit/96cf5f71f931640e35566072f0b4ae04458aa36e))
* **deps:** update dependency commander to v13.1.0 ([#1072](https://github.com/ghost-fvtt/foundry-publish/issues/1072)) ([ee7c395](https://github.com/ghost-fvtt/foundry-publish/commit/ee7c395d0ef96acb662283a8ccd8ab76e3f6f1a3))
* **deps:** update dependency fp-ts to v2.16.3 ([56ee030](https://github.com/ghost-fvtt/foundry-publish/commit/56ee0306482436cf5dddd43d66b004c12f23900e))
* **deps:** update dependency fp-ts to v2.16.4 ([ef4d217](https://github.com/ghost-fvtt/foundry-publish/commit/ef4d2170e307e8b00c04a8cbf4c01533d4e277c1))
* **deps:** update dependency fp-ts to v2.16.5 ([66fd9b1](https://github.com/ghost-fvtt/foundry-publish/commit/66fd9b16be38df2f79ea37b4c237238dfed2a69f))
* **deps:** update dependency fp-ts to v2.16.6 ([f144497](https://github.com/ghost-fvtt/foundry-publish/commit/f144497db1320c18052dd78b2598d91bb9756862))
* **deps:** update dependency fp-ts to v2.16.7 ([2fed844](https://github.com/ghost-fvtt/foundry-publish/commit/2fed8443772c381b0bd1aa87887270b3b1ea12c4))
* **deps:** update dependency fp-ts to v2.16.8 ([03d45d5](https://github.com/ghost-fvtt/foundry-publish/commit/03d45d5c62a85f94e18d53ec12dee5492d010dc6))
* **deps:** update dependency fp-ts to v2.16.9 ([8761880](https://github.com/ghost-fvtt/foundry-publish/commit/8761880092c7227cbecacad4a1506ba497652e94))
* **deps:** update dependency fs-extra to v11.3.0 ([#1066](https://github.com/ghost-fvtt/foundry-publish/issues/1066)) ([caf8a22](https://github.com/ghost-fvtt/foundry-publish/commit/caf8a229f543f9f1f4b6edfac80ad3c71ffb9902))
* **deps:** update dependency io-ts to v2.2.22 ([#1042](https://github.com/ghost-fvtt/foundry-publish/issues/1042)) ([94d45d9](https://github.com/ghost-fvtt/foundry-publish/commit/94d45d941eec3e41cdd9e54822ad9641761edad0))
* **deps:** update playwright monorepo to v1.41.2 ([7773b5a](https://github.com/ghost-fvtt/foundry-publish/commit/7773b5a11800c6e33c8235a3c1b1f8e82ac6b7b5))
* **deps:** update playwright monorepo to v1.42.1 ([49f0ff6](https://github.com/ghost-fvtt/foundry-publish/commit/49f0ff62a02893127c911f05832c0506a0db5433))
* **deps:** update playwright monorepo to v1.43.0 ([d697bfe](https://github.com/ghost-fvtt/foundry-publish/commit/d697bfecccef566f87c907193121aee271e450af))
* **deps:** update playwright monorepo to v1.43.1 ([843787f](https://github.com/ghost-fvtt/foundry-publish/commit/843787f81bc413314dc814dbc4d4809e2f543c26))
* **deps:** update playwright monorepo to v1.44.0 ([5a06c97](https://github.com/ghost-fvtt/foundry-publish/commit/5a06c97c17490037a26e0a0fc50c8bb8e0247ced))
* **deps:** update playwright monorepo to v1.44.1 ([28ef997](https://github.com/ghost-fvtt/foundry-publish/commit/28ef997d23ad4dcf6a7122ed6ee1dbb423acafb8))
* **deps:** update playwright monorepo to v1.45.0 ([44f4467](https://github.com/ghost-fvtt/foundry-publish/commit/44f4467ed4f1cd69eaeaea15ef79a96f2cd04a24))
* **deps:** update playwright monorepo to v1.45.1 ([187e7e8](https://github.com/ghost-fvtt/foundry-publish/commit/187e7e890c987d42621a86757d54a862ced1bbee))
* **deps:** update playwright monorepo to v1.45.2 ([defc977](https://github.com/ghost-fvtt/foundry-publish/commit/defc97776902c66d2765a08ab8fb95f24915fa56))
* **deps:** update playwright monorepo to v1.45.3 ([74dc26c](https://github.com/ghost-fvtt/foundry-publish/commit/74dc26cf07e7f8a096d292131c6c3fbcd2f8190e))
* **deps:** update playwright monorepo to v1.46.0 ([d946c1f](https://github.com/ghost-fvtt/foundry-publish/commit/d946c1f0351c3221cd4c292bcc5c7ae29d26893b))
* **deps:** update playwright monorepo to v1.46.1 ([31f4263](https://github.com/ghost-fvtt/foundry-publish/commit/31f4263fdef741572eefd2f4ad6f400342ac91be))
* **deps:** update playwright monorepo to v1.47.0 ([1afde8a](https://github.com/ghost-fvtt/foundry-publish/commit/1afde8a8b4d3b41589106f285dc0ac0784c77f51))
* **deps:** update playwright monorepo to v1.47.1 ([b46f3ed](https://github.com/ghost-fvtt/foundry-publish/commit/b46f3ed84bd17c52a8c98f0fca674beff5b607db))
* **deps:** update playwright monorepo to v1.47.2 ([a7100e4](https://github.com/ghost-fvtt/foundry-publish/commit/a7100e4d6db1f1772cd844c35509ac91566b85e7))
* **deps:** update playwright monorepo to v1.48.0 ([d6c3c72](https://github.com/ghost-fvtt/foundry-publish/commit/d6c3c729039559097e1a6623979486de6a1b98e6))
* **deps:** update playwright monorepo to v1.48.1 ([7695e7a](https://github.com/ghost-fvtt/foundry-publish/commit/7695e7a04bf5f134d937e336307fe2efb3a09ad4))
* **deps:** update playwright monorepo to v1.48.2 ([289fb4f](https://github.com/ghost-fvtt/foundry-publish/commit/289fb4f037e6a35648d3cde1f63a2727871b1476))
* **deps:** update playwright monorepo to v1.49.0 ([#1022](https://github.com/ghost-fvtt/foundry-publish/issues/1022)) ([a21209b](https://github.com/ghost-fvtt/foundry-publish/commit/a21209b660bbf4c08aed343848cfe4c4544db919))
* **deps:** update playwright monorepo to v1.49.1 ([#1040](https://github.com/ghost-fvtt/foundry-publish/issues/1040)) ([e5fa2bd](https://github.com/ghost-fvtt/foundry-publish/commit/e5fa2bd0ef914a1e1bae7749716b3a73eb82d008))
* **deps:** update playwright monorepo to v1.50.0 ([#1076](https://github.com/ghost-fvtt/foundry-publish/issues/1076)) ([275e539](https://github.com/ghost-fvtt/foundry-publish/commit/275e5394906fafac54bf2683dfc499d2361ed94e))
* **deps:** update playwright monorepo to v1.50.1 ([#1083](https://github.com/ghost-fvtt/foundry-publish/issues/1083)) ([d09f0dd](https://github.com/ghost-fvtt/foundry-publish/commit/d09f0dd1e6e3eab06b8e2be5d1d9417cd599abca))
* fix publishing ([bb6312a](https://github.com/ghost-fvtt/foundry-publish/commit/bb6312a8d27248c2a00aec95f7fe9dd02b5c20c9))

## [3.0.0](https://github.com/ghost-fvtt/foundry-publish/compare/v2.4.1...v3.0.0) (2024-01-28)


### ⚠ BREAKING CHANGES

* The legacy flow that is not supported by foundryvtt.com anymore has been removed.
The new flow is now used by default.

### Features

* remove legacy flow that's not supported anymore ([367981e](https://github.com/ghost-fvtt/foundry-publish/commit/367981e857c97d11034ce8ecbf4088b95499bf75))


### Bug Fixes

* **deps:** update dependency fp-ts to v2.16.2 ([11f3619](https://github.com/ghost-fvtt/foundry-publish/commit/11f36193d79a1a8c52fa85b61dc6f0630e88aa5b))
* **deps:** update dependency fs-extra to v11.2.0 ([1f47cd5](https://github.com/ghost-fvtt/foundry-publish/commit/1f47cd5268ccf38fff40bfd831dddd9d8939d1ab))
* **deps:** update dependency io-ts to v2.2.21 ([525aaad](https://github.com/ghost-fvtt/foundry-publish/commit/525aaad355f7d810cd7155d430f6c91712f3aa62))
* **deps:** update playwright monorepo to v1.40.0 ([a985e28](https://github.com/ghost-fvtt/foundry-publish/commit/a985e28cefb49a3bbf4aad1725fe590562c9aeae))
* **deps:** update playwright monorepo to v1.40.1 ([88a9168](https://github.com/ghost-fvtt/foundry-publish/commit/88a916808f9f193bb7c542df7e00743165561e22))
* **deps:** update playwright monorepo to v1.41.0 ([e4520d1](https://github.com/ghost-fvtt/foundry-publish/commit/e4520d1c75c9cc83f9f94514918d19d2900a2cf0))
* **deps:** update playwright monorepo to v1.41.1 ([63327c3](https://github.com/ghost-fvtt/foundry-publish/commit/63327c362e3a1bbfe617dfbd0224bfd77c639731))
* fix login ([fc6cf2f](https://github.com/ghost-fvtt/foundry-publish/commit/fc6cf2f0cc436f901a8bc44eba254f700766b9d0))

### [2.4.1](https://github.com/ghost-fvtt/foundry-publish/compare/v2.4.0...v2.4.1) (2023-11-05)


### Bug Fixes

* improve error checking in new flow ([1ea67b8](https://github.com/ghost-fvtt/foundry-publish/commit/1ea67b860abdb512382624c10e48347c470c81db))

## [2.4.0](https://github.com/ghost-fvtt/foundry-publish/compare/v2.3.0...v2.4.0) (2023-11-05)


### Features

* support the new package administration interface ([759a3bd](https://github.com/ghost-fvtt/foundry-publish/commit/759a3bde760c52b8644662da4b4abbc010218b06))


### Bug Fixes

* **deps:** update dependency commander to v11.1.0 ([a06b95a](https://github.com/ghost-fvtt/foundry-publish/commit/a06b95ab555a9cd7c90b96f2e0f4f78bff4b8dae))
* **deps:** update dependency playwright-chromium to v1.38.1 ([0dc7d9d](https://github.com/ghost-fvtt/foundry-publish/commit/0dc7d9d44cf581555e0f2b114b071a63c7f20cd6))
* **deps:** update dependency playwright-chromium to v1.39.0 ([ceba9c8](https://github.com/ghost-fvtt/foundry-publish/commit/ceba9c827a2a37923027ce1023d37e5813facb80))

## [2.3.0](https://github.com/ghost-fvtt/foundry-publish/compare/v2.2.4...v2.3.0) (2023-09-16)


### Features

* add option ro run in headed mode ([99bd831](https://github.com/ghost-fvtt/foundry-publish/commit/99bd831a2896056252d357a126a6920c34cb4172))
* check for errors after submitting ([f738e0e](https://github.com/ghost-fvtt/foundry-publish/commit/f738e0e4e42ac3857b1cadd281680c086ab2b3ae))


### Bug Fixes

* **deps:** update dependency fp-ts to v2.16.1 ([7f26db1](https://github.com/ghost-fvtt/foundry-publish/commit/7f26db1cfa58cd2af24f372ce8ff6c2622dd9529))
* **deps:** update dependency playwright-chromium to v1.36.0 ([fab8ccb](https://github.com/ghost-fvtt/foundry-publish/commit/fab8ccb4f258cb4f7cc313868add9d8def65bee4))
* **deps:** update dependency playwright-chromium to v1.36.1 ([85f1e1c](https://github.com/ghost-fvtt/foundry-publish/commit/85f1e1c77f78c79cfa973b222196c3db9fec81fc))
* **deps:** update dependency playwright-chromium to v1.36.2 ([3d562ae](https://github.com/ghost-fvtt/foundry-publish/commit/3d562aecee67b1a858dc7b8489cdfa1cee587b64))
* **deps:** update dependency playwright-chromium to v1.37.0 ([dd770e4](https://github.com/ghost-fvtt/foundry-publish/commit/dd770e4ed29e47cbc0f943e20edc8b23e7830c7a))
* **deps:** update dependency playwright-chromium to v1.37.1 ([a9c357c](https://github.com/ghost-fvtt/foundry-publish/commit/a9c357c77e9ab864d5b5464d5103828fd6a28384))
* **deps:** update dependency playwright-chromium to v1.38.0 ([02d3b4e](https://github.com/ghost-fvtt/foundry-publish/commit/02d3b4e620173b4146fd2f21546ded626c593d57))

### [2.2.4](https://github.com/ghost-fvtt/foundry-publish/compare/v2.2.3...v2.2.4) (2023-07-12)

### [2.2.3](https://github.com/ghost-fvtt/foundry-publish/compare/v2.2.2...v2.2.3) (2023-06-17)


### Bug Fixes

* **deps:** update dependency commander to v10 ([9e4bff9](https://github.com/ghost-fvtt/foundry-publish/commit/9e4bff987e01ba52a1fefa6abb8b3ecf5d6250cd))
* **deps:** update dependency commander to v11 ([e7c7eee](https://github.com/ghost-fvtt/foundry-publish/commit/e7c7eee029772de76233016596da09c28d38a97b))
* **deps:** update dependency fs-extra to v11 ([d164126](https://github.com/ghost-fvtt/foundry-publish/commit/d164126c270195d713ed9c67fce4de07e0f18811))
* **deps:** update dependency playwright-chromium to v1.35.0 ([a04b52b](https://github.com/ghost-fvtt/foundry-publish/commit/a04b52bba8a38b19eac7f3fb68a9c8f08d1cda83))
* **deps:** update dependency playwright-chromium to v1.35.1 ([89f9110](https://github.com/ghost-fvtt/foundry-publish/commit/89f9110a9cf46bc33064ea0d83d7af7fc57d496b))
* exit with error status if option validations fails ([4d20ba2](https://github.com/ghost-fvtt/foundry-publish/commit/4d20ba2255397c04f6c44dc9037b3cefd9b693d1))

### [2.2.2](https://github.com/ghost-fvtt/foundry-publish/compare/v2.2.1...v2.2.2) (2022-10-26)

### [2.2.1](https://github.com/ghost-fvtt/foundry-publish/compare/v2.2.0...v2.2.1) (2022-09-11)


### Bug Fixes

* log information about obsolete versions being deleted ([40ec88d](https://github.com/ghost-fvtt/foundry-publish/commit/40ec88d221e08eef2979e6ea2dc69cd56788a6f8))

## [2.2.0](https://github.com/ghost-fvtt/foundry-publish/compare/v2.1.0...v2.2.0) (2022-08-01)


### Features

* allow numbers to be used as version identifiers in manifests ([df1ae03](https://github.com/ghost-fvtt/foundry-publish/commit/df1ae030c0c2ff72fc2fdbe4c3455259ce218bdf))

## [2.1.0](https://github.com/ghost-fvtt/foundry-publish/compare/v2.0.1...v2.1.0) (2022-07-17)


### Features

* add support for v10 manifests and maximum core version ([9dedd81](https://github.com/ghost-fvtt/foundry-publish/commit/9dedd818855a709fb3ea9ae46622a8420881dd0a))

### [2.0.1](https://github.com/ghost-fvtt/foundry-publish/compare/v2.0.0...v2.0.1) (2022-05-23)


### Bug Fixes

* include chromium in docker file ([e6cc794](https://github.com/ghost-fvtt/foundry-publish/commit/e6cc794332f17232243525ba1df8cd84c037da3d))

## [2.0.0](https://github.com/ghost-fvtt/foundry-publish/compare/v1.4.1...v2.0.0) (2022-05-23)


### ⚠ BREAKING CHANGES

* Instead of the user name of the regular foundry website, the username now might need to be set to
the email address.

### Features

* add support for the new foundry webpage and add a dry run mode ([71c616f](https://github.com/ghost-fvtt/foundry-publish/commit/71c616f5e73bc41475808f67f5613c13618f4960))

### [1.4.1](https://github.com/ghost-fvtt/foundry-publish/compare/v1.4.0...v1.4.1) (2022-02-02)

## [1.4.0](https://github.com/ghost-fvtt/foundry-publish/compare/v1.3.1...v1.4.0) (2022-02-01)


### Features

* add option to delete obsolete versions ([96a82f7](https://github.com/ghost-fvtt/foundry-publish/commit/96a82f73e6f76dbd0c05a1f239bd824919a594cd)), closes [#83](https://github.com/ghost-fvtt/foundry-publish/issues/83)

### [1.3.1](https://github.com/ghost-fvtt/foundry-publish/compare/v1.3.0...v1.3.1) (2022-02-01)


### Bug Fixes

* fix waiting for navigation after submitting ([1eac52a](https://github.com/ghost-fvtt/foundry-publish/commit/1eac52ab610bd7a3f39589d8d6561a4ec8f5adf9))
* return non-zero exit code when an error occurs ([c3917cc](https://github.com/ghost-fvtt/foundry-publish/commit/c3917cc3d09efa6ddfb978d658e5affacf00a43a))

## [1.3.0](https://github.com/ghost-fvtt/foundry-publish/compare/v1.2.0...v1.3.0) (2022-02-01)


### Features

* switch from puppeteer to playwrigth ([925b716](https://github.com/ghost-fvtt/foundry-publish/commit/925b716f33ee944832b5962b20a83ca5fb3f1bcf))


### Bug Fixes

* don't log options ([25a2bd4](https://github.com/ghost-fvtt/foundry-publish/commit/25a2bd4ad46ff38b4e9f23db0fca6c90165a5629))

## [1.2.0](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.6...v1.2.0) (2021-12-06)


### Features

* make changelogURL optional ([afb4e2a](https://github.com/ghost-fvtt/foundry-publish/commit/afb4e2a60abe5fa5aea0180c245d1874aeb4ab1d)), closes [#14](https://github.com/ghost-fvtt/foundry-publish/issues/14)

### [1.1.6](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.5...v1.1.6) (2021-11-05)

### [1.1.5](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.4...v1.1.5) (2021-11-05)

### [1.1.4](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.3...v1.1.4) (2021-11-05)

### [1.1.3](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.2...v1.1.3) (2021-11-05)

### [1.1.2](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.1...v1.1.2) (2021-09-17)

### [1.1.1](https://github.com/ghost-fvtt/foundry-publish/compare/v1.1.0...v1.1.1) (2021-09-17)

## [1.1.0](https://github.com/ghost-fvtt/foundry-publish/compare/v1.0.0...v1.1.0) (2021-09-15)


### Features

* add dockerfile ([760887a](https://github.com/ghost-fvtt/foundry-publish/commit/760887afd537df003a126bd562a3c44a6874d15f))

## [1.0.0](https://github.com/ghost-fvtt/foundry-publish/compare/v0.0.4...v1.0.0) (2021-09-15)

### [0.0.4](https://github.com/ghost-fvtt/foundry-publish/compare/v0.0.3...v0.0.4) (2021-09-15)


### Features

* initial proper release ([30ad8a9](https://github.com/ghost-fvtt/foundry-publish/commit/30ad8a9460826359d69add70d7f7e68cd3ad76d6))

### [0.0.3](https://github.com/ghost-fvtt/foundry-publish/compare/v0.0.2...v0.0.3) (2021-09-15)

### 0.0.2 (2021-09-15)


### Features

* initial commit ([7c3dfae](https://github.com/ghost-fvtt/foundry-publish/commit/7c3dfaea500502864efcfcc9359cea445dda063b))
