# Development setup

Choose the repository for the part of the stack you are changing. These are
contributor instructions; the [installation guide](../user/install.md) is the
shorter path for researchers.

## Documentation site

This site is built in the standalone `LightconeResearch/docs` repository:

```bash
git clone https://github.com/LightconeResearch/docs.git
cd docs
uv sync --locked
uv run zensical serve
```

Edit the Markdown in `docs/`, navigation in `zensical.toml`, and styles in
`docs/stylesheets/extra.css`. Before submitting a change, build the site with
the same command as CI:

```bash
uv run zensical build --clean --strict
```

The build writes `site/`. CI validates pull requests and publishes changes on
`main` to GitHub Pages. Keep examples aligned with the documented CLI version;
a working example from a development branch may use commands the installed
release does not provide.

## Agent skills

```bash
git clone https://github.com/LightconeResearch/agent-skills.git
cd agent-skills
npm run build
npm test
```

The generator requires Node.js 18 or newer. Edit canonical files under `skills/`
and `hooks/`, or plugin composition and tool pins in `skills.config.json`.
`npm run build` generates the packaged plugins and marketplace manifests; commit
those generated changes with their sources. Follow that repository's
[contribution guide](https://github.com/LightconeResearch/agent-skills/blob/main/CONTRIBUTING.md)
for plugin version bumps and installation smoke tests.

## Lightcone CLI

```bash
git clone https://github.com/LightconeResearch/lightcone-cli.git
cd lightcone-cli
git switch --detach 835de9e7c2df726722ffff8c6863d6f9b16ee577
uv sync --group dev
```

The checkout above matches this site's compute preview. Create a development
branch from that revision when making a change, or use the project's current
development branch and account for any differences from these docs.

This installs the engine and its development tools into `.venv`. Run
`uv run lc --version` to use the checkout's CLI. Git must be available on `PATH`;
git-annex arrives with the Python dependencies.

```bash
uv run pytest
uv run ruff check src/ tests/
uv run mypy src/
```

The suite includes pure and stubbed tests alongside integration tests that use
real tools. See [Testing](testing.md) for the boundaries and fixture conventions.

### Tests that need a real mechanism

These suites skip if their mechanism is unavailable. CI sets the corresponding
variable to turn a skip into a failure:

| Variable | Suite | Needs |
|---|---|---|
| `LC_SANDBOX_TESTS_REQUIRED=1` | `test_sandbox_enforcement.py` | Landlock on Linux or Seatbelt on macOS |
| `LC_CONTAINER_TESTS_REQUIRED=1` | `test_container_smoke.py` | Podman or Docker |
| `LC_CRATE_TESTS_REQUIRED=1` | `test_crate_smoke.py` | The development dependencies |

Run the relevant real suite when changing sandbox enforcement, containers, or
publication metadata.

### Build the CLI distribution

```bash
uv build
```

The CLI version comes from Git through hatch-vcs: a release tag for a release,
or a tag plus commit for a development build. Read [Extending](extending.md)
before adding engine behavior so the change uses the existing interfaces.
