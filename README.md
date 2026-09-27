# Lightcone Research Stack documentation

[![Docs](https://img.shields.io/github/actions/workflow/status/LightconeResearch/docs/docs.yml?branch=main&style=flat&label=docs&color=darkgreen)](https://docs.lightconeresearch.org)
[![License](https://img.shields.io/badge/License-BSD_3--Clause-426b78.svg?style=flat)](LICENSE)

The **Lightcone Research Stack** is [Lightcone Research](https://lightconeresearch.org/)'s
tooling for research analyses described with [ASTRA](https://astra-spec.org/latest/)
(Agentic Schema for Transparent Research Analysis). You describe an analysis in an
`astra.yaml` specification; the stack validates it and takes care of the rest —
execution, environments, and provenance.

**→ Read the documentation at <https://docs.lightconeresearch.org>**

## Where to start

- [Install](https://docs.lightconeresearch.org/user/install/) — uv, git, and the `lc` command
- [Getting started](https://docs.lightconeresearch.org/user/getting-started/) — your first analysis, from `lc init` to a published result
- [Core concepts](https://docs.lightconeresearch.org/user/concepts/) — projects, output identity, and how provenance is recorded
- [Running on a cluster](https://docs.lightconeresearch.org/user/cluster/) — SLURM, containers on HPC, and parallel filesystems
- [Troubleshooting](https://docs.lightconeresearch.org/user/troubleshooting/) — common errors and how to fix them

## Components

| Component | What it does | Repository |
| --- | --- | --- |
| **lightcone-cli** | The `lc` CLI: project scaffolding, locked environments, sandboxed execution, and the provenance layer | [LightconeResearch/lightcone-cli](https://github.com/LightconeResearch/lightcone-cli) |
| **astra-tools** | The SDK and `astra` CLI for ASTRA specifications: schema, validation, and evidence verification helpers | [LightconeResearch/astra-tools](https://github.com/LightconeResearch/astra-tools) |

## Feedback

The stack is in early alpha, and bug reports, design challenges, and use cases it
doesn't cover yet are welcome. Report a problem with a tool on that tool's
repository; report a problem with the documentation itself — a page that is wrong,
unclear, or out of date — [here](https://github.com/LightconeResearch/docs/issues).

## License

BSD 3-Clause — see [LICENSE](LICENSE).
