# Foundry Publish

[![Checks](https://github.com/ghost-fvtt/foundry-publish/workflows/Checks/badge.svg)](https://github.com/ghost-fvtt/foundry-publish/actions)
[![npm downloads](https://img.shields.io/npm/dm/@ghost-fvtt/foundry-publish?color=orange&logo=npm)](https://www.npmjs.com/package/@ghost-fvtt/foundry-publish)
[![Docker pulls](https://img.shields.io/docker/pulls/johannesloher/foundry-publish?logo=docker)](https://hub.docker.com/r/johannesloher/foundry-publish)
![Repository License](https://img.shields.io/github/license/ghost-fvtt/foundry-publish)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-ghostfvtt-00B9FE?logo=kofi)](https://ko-fi.com/ghostfvtt)

Foundry Publish is a CLI tool that developers can use to add new versions of
their packages for [Foundry Virtual Tabletop] to the [Package Administration].

## Usage

You can run Foundry Publish with `npx`:

```
npx @ghost-fvtt/foundry-publish [options]
```

Alternatively you can install it globally and then execute it:

```
npm install -g @ghost-fvtt/foundry-publish
foundry-publish [options]
```

### Options

In order to use Foundry Publish, you need to provide several parameters. They
can be provided either as environment variables or as command line options, with
one exception: For security reasons, the password required to authenticate with
the [Package Administration] can _only_ be provided as environment variable.
Additionally, a couple of options can also be read from a manifest file.

| Command Line Parameter    | Environment Variable           | Manifest Property       | Description                                                                                                  | Required |
| ------------------------- | ------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------ | -------- |
| `--changelogURL`          | `FVTT_CHANGELOG_URL`           | `changelog`             | The URL of the changelog of the package version being published                                              | No       |
| `--compatibleCoreVersion` | `FVTT_COMPATIBLE_CORE_VERSION` | `compatibleCoreVersion` | The maximum version of the core Foundry software beyond which compatibility of the package is not guaranteed | Yes      |
| `--manifestURL`           | `FVTT_MANIFEST_URL`            | `manifest`              | The URL of the manifest of the package version being published                                               | Yes      |
| `--manifestPath`          | `FVTT_MANIFEST_PATH`           |                         | A path to a manifest file to read information from                                                           | No       |
| `--minimumCoreVersion`    | `FVTT_MINIMUM_CORE_VERSION`    | `minimumCoreVersion`    | The minimum version of the core Foundry software which is required to use the package                        | Yes      |
| `--packageID`             | `FVTT_PACKAGE_ID`              |                         | The numeric ID of the package                                                                                | Yes      |
| `--packageVersion`        | `FVTT_PACKAGE_VERSION`         | `version`               | The version of the package                                                                                   | Yes      |
|                           | `FVTT_PASSWORD`                |                         | The password of the account for accessing the Foundry VTT administration page                                | Yes      |
| `--username`              | `FVTT_USERNAME`                |                         | The username of the account for accessing the Foundry VTT administration page                                | Yes      |

## Development

### Prerequisites

In order to build this project, recent versions of `node` and `npm` are
required. We recommend using the latest lts version of `node`. If you use `nvm`
to manage your `node` versions, you can simply run

```
nvm install
```

in the project's root directory.

You also need to install the project's dependencies. To do so, run

```
npm install
```

### Building

You can build the project by running

```
npm run build
```

Alternatively, you can run

```
npm run watch
```

to watch for changes and automatically build as necessary.

## Contributing

Contributions via pull requests are very welcome. If you find any issues, please
report them in the [issue tracker].

## Licensing

This software project is licensed under the MIT License, a copy of which can be
found under [LICENSE](./LICENSE).

## Acknowledgment

This project is heavily based on [eXaminator]'s [foundry-auto-release]. Thanks
for the great work!

[Foundry Virtual Tabletop]: https://foundryvtt.com
[Package Administration]: http://foundryvtt.com/admin
[issue tracker]: https://github.com/ghost-fvtt/foundry-publish/issues
[eXaminator]: https://github.com/eXaminator
[foundry-auto-release]: https://github.com/eXaminator/foundry-auto-release
