# docs

Documentation for the Lightcone Research stack, built with
[Zensical](https://zensical.org/).

## Preview locally

The site only needs [uv](https://docs.astral.sh/uv/getting-started/installation):

```bash
uv sync
uv run zensical serve        # live preview at http://127.0.0.1:8000
uv run zensical build --strict   # what CI runs
```

## Layout

- `zensical.toml` — site config and navigation
- `docs/` — page sources (Markdown), plus `assets/` and `stylesheets/`

## Origin

The initial content is the `docs/` tree of
[lightcone-cli](https://github.com/LightconeResearch/lightcone-cli) as of
`main` @ `3aa823b`, imported unchanged.
