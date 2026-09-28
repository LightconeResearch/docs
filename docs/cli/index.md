# CLI Reference

The `lc` command executes and tracks your research project. Use it directly
from a terminal or through the Lightcone agent skills. Your analysis lives in
`astra.yaml`; the CLI manages its environment, compute, results, and provenance.

This reference follows the compute-enabled preview in the
[installation guide](../user/install.md).

## Global behavior

- **Run project commands from the project root.** `lc init` can create
  a directory, and `lc compute` works without a project. Other commands
  inspect the current directory; they do not search parent directories.
- **Choose compute explicitly.** Launch an allocation with `lc compute`,
  then pass its ID to `lc run` or `lc materialize`. Compute settings live
  in an optional user catalog; a small local offer works without one.
- **Nothing waits on a human.** No command prompts or opens an
  interactive shell — every verb runs to completion on its arguments
  alone, which is what makes the CLI safe to drive from scripts and
  agents.
- **Refusals carry their remedy.** When a command refuses (a dirty
  tree, an unavailable cluster, a missing image), the message names the exact
  command that fixes it.

## Commands

| Command | Purpose |
|---------|---------|
| [`lc init`](init.md) | Converge a directory into a Lightcone project (idempotent). |
| [`lc materialize`](materialize.md) | Make the analysis's outputs; commit each one as it lands. |
| [`lc status`](status.md) | Inspect outputs and provenance without running recipes. |
| [`lc compute`](compute.md) | Allocate resources, inspect clusters, and end allocations. |
| [`lc run`](run.md) | Run an ad-hoc command in the project environment, under isolation. |
| [`lc build`](build.md) | Containerized projects: build the image and commit it. |

## Global options

```text
lc [OPTIONS] COMMAND [ARGS]...

Options:
  --version  Show the version and exit.
  --help     Show this message and exit.
```

## Exit codes

- `0` — the command did what it says.
- `1` — a refusal or a failure. For
  `lc materialize --check` and `lc init --check`, exit 1 means "work
  would be done" — the gate form scripts branch on.
- `2` — invalid CLI usage, such as a missing required argument.
- `lc run` is a proxy: it exits with the command's own code
  (`128 + N` for a signal), so pipelines read it exactly as they would
  the bare command.

Report commands accept `--json`; each command's page describes its shape.
`lc status` exits 0 when it can report the project, including stale results;
an unreadable or invalid project can still fail. Compute errors requested with
`--json` are returned as JSON on stdout.
