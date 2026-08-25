# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [semantic versioning](https://semver.org/).

Entries begin with the introduction of this changelog; earlier history is in the
Git log.

## [Unreleased]

### Added

- Repository documentation set under `docs/` (architecture, development,
  deployment, Momo assistant).
- GitHub issue forms, pull request template, `CODEOWNERS` and Dependabot
  configuration.
- CI workflow running lint, type-check and the static export build, plus `php -l`
  across the PHP endpoints.
- `SECURITY.md`, `CONTRIBUTING.md` and `.editorconfig`.
- `npm run typecheck` script.

### Changed

- `npm run lint` now runs ESLint against a flat config; `next lint` was removed
  in Next 16 and the script no longer worked.
- `README.md` reduced to an overview and entry point, with the detailed guides
  moved into `docs/`.

### Removed

- A stray sendmail artefact and an unused image asset that had been committed by
  accident; `tsconfig.tsbuildinfo` is no longer tracked.
