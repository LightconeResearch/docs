# Lightcone Research Stack documentation

User guides and reference material for the [Lightcone Research Stack](https://lightconeresearch.org/): the `lc` execution tools, research agent skills, and their integration with the external [ASTRA specification](https://astra-spec.org/latest/).

**[Read the documentation →](https://docs.lightconeresearch.org/)**

## Start here

- [Install](https://docs.lightconeresearch.org/user/install/) — one CLI setup, with an optional agent plugin.
- [Your first analysis](https://docs.lightconeresearch.org/user/getting-started/) — run a complete local example and inspect its provenance.
- [Work with an agent](https://docs.lightconeresearch.org/user/agents/) — scope, implement, and resume a research project.
- [Meet the stack](https://docs.lightconeresearch.org/user/) — understand how the tools fit together.

These docs currently target the upcoming explicit compute workflow. The installation guide pins a source revision that includes `lc compute`; the published `0.5.0rc4` release uses an earlier workflow. Keep installation instructions, tutorials, and command reference aligned when moving to a new release.

## Build locally

With [uv](https://docs.astral.sh/uv/getting-started/installation/) installed:

```bash
uv sync --locked
uv run zensical serve
```

Before submitting a change:

```bash
uv run zensical build --clean --strict
```

Pull requests run the same strict build. Updates to `main` are deployed through GitHub Pages by [the docs workflow](.github/workflows/docs.yml).

## Where to edit

| Location | Purpose |
| --- | --- |
| `docs/index.md` | Stack landing page |
| `docs/user/` | Installation, tutorials, and task-oriented guides |
| `docs/cli/` | CLI command reference |
| `docs/api/`, `docs/architecture.md` | CLI implementation reference |
| `docs/contributing/`, `docs/maintainer.md` | Contributor guidance |
| `zensical.toml` | Navigation and site configuration |
| `docs/stylesheets/extra.css`, `overrides/` | Website-aligned typography, colors, and layout |

The design follows [lightcone-website](https://github.com/LightconeResearch/lightcone-website): Quattrocento headings, Newsreader prose, Alegreya navigation, JetBrains Mono code, parchment surfaces, and antique-gold accents. The landing-page engraving is the same *Uranometria* (Bayer, 1603) asset used by the website.

Check technical claims against the relevant source:

- [lightcone-cli](https://github.com/LightconeResearch/lightcone-cli) — execution and provenance.
- [agent-skills](https://github.com/LightconeResearch/agent-skills) — plugin installation, skills, and hooks.
- [ASTRA documentation](https://astra-spec.org/latest/) and [astra-tools](https://github.com/LightconeResearch/astra-tools) — the external specification and validation tools.

Preserve existing page URLs when reorganizing navigation. Keep advanced implementation details in the reference and contributor sections, and put a runnable path before optional setup.

## Feedback and license

Report documentation problems in [this repository's issues](https://github.com/LightconeResearch/docs/issues). Report tool behavior in the relevant tool's repository. The stack is in early alpha and feedback from real analyses is welcome.

BSD 3-Clause — see [LICENSE](LICENSE).
