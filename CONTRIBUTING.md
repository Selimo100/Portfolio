# Contributing

This is a personal portfolio, so feature contributions are unlikely to be
merged — but bug reports, corrections and clearly scoped fixes are welcome, and
these are the conventions the repository is developed under.

## Getting set up

```bash
git clone git@github.com:Selimo100/Portfolio.git
cd Portfolio
npm install
```

Then, in two terminals:

```bash
npm run php    # PHP endpoints on :8001 (mail is captured to a file)
npm run dev    # the site on :3000
```

See [docs/development.md](docs/development.md) for what each process does and
which features need which one.

## Before opening a pull request

```bash
npm run lint
npm run typecheck
npm run build
```

All three must pass — CI runs exactly these, plus `php -l` over every file in
`server/`.

## Branching

Work happens on branches off `main` and lands through a pull request.

```text
feature/<description>
fix/<description>
docs/<description>
refactor/<description>
chore/<description>
ci/<description>
```

For example: `fix/contact-form-empty-response`.

## Commit messages

Future commits follow a lightweight [Conventional
Commits](https://www.conventionalcommits.org/) style. History before this
convention was introduced is left as it is.

```text
feat: add a Rummy project card
fix: handle an empty Spotify response
docs: document the FTP size check
refactor: split the Momo provider selection
chore: update dependencies
ci: cache npm downloads in the build job
```

Keep the subject in the imperative mood and under roughly 72 characters.

## Coding conventions

- **TypeScript, no `any`.** Components are function components; hooks live next
  to the component that owns them.
- **Content is not hardcoded in components.** Every visible string and every
  project entry lives in [`src/lib/content.ts`](src/lib/content.ts), in all
  three languages (EN / DE / IT). A change that adds copy in only one language
  is incomplete.
- **Styling is hand-written CSS** in [`src/styles/globals.css`](src/styles/globals.css),
  built on the design tokens defined at the top of that file for both themes.
  No UI framework, no CSS-in-JS.
- **PHP targets 8.1** with `declare(strict_types=1)`, returns JSON, and never
  leaks stack traces or paths to the client.
- **Comments explain decisions, not syntax.** Prefer readable code.
- Indentation follows [`.editorconfig`](.editorconfig): 2 spaces for TS/JS/CSS,
  4 for PHP, Python and shell.

## Testing

There is no automated test suite; the site is verified through the CI checks
above plus manual verification of the parts a build cannot prove:

- `npm run preview` after a build — static pages and PHP served together, the
  way the server runs them
- the contact form against `npm run php`, then `cat server/storage/maillog`
- the Momo endpoint with the `curl` cases in [docs/momo.md](docs/momo.md)

If you add logic that can be tested in isolation, adding a test runner along
with it is welcome.

## Reporting bugs

Open an issue using the [bug report
form](https://github.com/Selimo100/Portfolio/issues/new/choose). Security
problems go through [SECURITY.md](SECURITY.md) instead — never a public issue.

## Recommended repository settings

`main` is the default branch and is intended to be protected with:

- require a pull request before merging
- require the `CI` status checks to pass
- require conversation resolution before merging
- block force pushes and branch deletion

These are GitHub repository settings and are not represented in the codebase.

## Releases

Versions follow [semantic versioning](https://semver.org/) (`MAJOR.MINOR.PATCH`)
and are tracked in [`package.json`](package.json) and
[CHANGELOG.md](CHANGELOG.md).

1. Move the relevant `Unreleased` entries into a new version section, dated.
2. Bump the version in `package.json`.
3. Tag the commit `vX.Y.Z` and create a GitHub Release from the changelog entry.
4. Deploy with `npm run build && npm run deploy` (see
   [docs/deployment.md](docs/deployment.md)).
