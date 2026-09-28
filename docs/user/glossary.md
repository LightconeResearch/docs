# Glossary

Terms used across the Lightcone research workflow, its agent skills, and
the `lc` command output.

## Lightcone

The research stack that connects agent guidance, analysis implementation,
reproducible execution, and reporting. Its agent skills help you develop a
project; `lightcone-cli` executes it and records provenance. The analysis
specification follows the external ASTRA standard.

## Agent skill

Instructions and supporting resources that teach a compatible coding agent
a research workflow. Lightcone's `lightcone` plugin bundles the `lightcone`
and `astra` skills, together with validation hooks. Skills guide the agent;
the CLI and ASTRA tools perform execution and validation.

## ASTRA

**A**gentic **S**chema for **T**ransparent **R**esearch **A**nalysis.
An external standard that Lightcone uses. ASTRA's job is to capture an
analysis's inputs, outputs, and methodological decisions in a single
file (`astra.yaml`); lightcone-cli's job is to execute that spec
reproducibly. ASTRA ships separately as the `astra-tools` package, and
its `astra` CLI handles the spec itself (validation, universe
management, evidence verification). Its authoritative documentation lives at
[astra-spec.org](https://astra-spec.org/latest/).

## astra.yaml

Your project's spec file. The single source of truth — every input,
output, recipe, and decision is declared here. Sub-analyses can be
nested via `analyses:` references.

## Recipe

A short shell command that produces an output. Lives inside an output's
`recipe:` block in `astra.yaml`. Outputs declare what they depend on,
and the recipe references those dependencies through placeholders:

```yaml
outputs:
  - id: fit
    inputs: [points]
    decisions: [outliers]
    recipe:
      command: python src/fit.py --points {inputs.points} --outliers {decisions.outliers} --output {output}
```

## Decision

A methodological choice with multiple defensible options (e.g.
"standardize features?", "what outlier threshold?"). Decisions live
in the `decisions:` section of `astra.yaml` along with their `default`,
their `options`, and their `rationale`.

## Universe

One specific selection of decision values. Universes live as YAML
files in `universes/` (e.g. `universes/baseline.yaml`,
`universes/robust.yaml`). Each universe materializes its results
to its own directory: `results/<universe>/<output_id>.<format>`.

## Sub-analysis

A nested ASTRA analysis with its own inputs, outputs, and decisions,
referenced from a parent's `analyses:` section. `lc` materializes a flat
analysis: an output id it cannot name a file from is refused, so a
nested spec is not buildable today.

## Materialize

Making the outputs the spec declares: `lc materialize` runs each recipe
in dependency order and commits every result as it lands. Idempotent —
a second run remakes only what is `stale`, and a run with nothing to do
says so and touches nothing.

## Compute allocation

Resources launched with `lc compute launch` for a bounded lifetime, locally or
on Slurm. The returned cluster ID is required by `lc materialize` and `lc run`.
An execution command borrows the allocation; it stays available until you
release it with `lc compute down` or its lifetime expires.

## Resource offer

A CPU and memory shape, node limit, and time limit that your compute catalog
makes available. `lc compute resources` lists offers in selection order. CPU
and memory are per node; an offer describes a requestable shape, not live free
capacity. See [Compute and clusters](cluster.md).

## Manifest

The per-output sidecar JSON file, `.<output_id>.manifest.json` beside
the output itself, recording what produced the
output: the recipe, the decisions, `definition_version`,
`env_version`, `data_version`, `input_versions`, the git commit the
run started at, the engine version, what enforcement actually ran
(`hermeticity`), and — for containerized runs — the image. Written by
the run, read by `lc status` and `lc materialize --check`; kept in
plain git so a clone can classify a whole project without fetching any
data.

## definition_version

A hash of an output's recipe and decision values — the fingerprint of
"what is this output?". When it drifts, the output is `stale` and the
next run remakes it.

## env_version

A hash of the environment — the lock file's bytes, the pinned
interpreter, the install settings, and the image declaration if any.
Deliberately *not* part of an output's definition: when it drifts, the
output is `behind`, reported and left alone.

## data_version

A content hash of an output's bytes (or of a declared input). For a
file it is a plain sha256 — the number `sha256sum` prints, and the one
the RO-Crate publishes; a directory-valued declared input is hashed
tree-wise and framed, so the two can never collide. This is what flows
downstream: a dependent is remade when an input's `data_version`
changed, and a rebuild that comes out byte-identical stops the cascade
right there.

## input_versions

Inside a manifest, a map from each declared input to the
`data_version` it had when the output was made. Comparing it against
the present is how a change to an input cascades.

## current / behind / stale

The three states an output can be in:

- `current` — exactly what the spec asks for, made from these inputs,
  under this environment. Nothing to do.
- `behind` — still what the spec asks for; only the environment moved
  since it was made. Reported, left alone; `--refresh` remakes.
- `stale` — contradicts the project: the spec defines it differently,
  an input changed, or the output was edited by hand. Remade on the
  next run.

## Direct mode / containerized mode

How recipes execute, derived from the project rather than configured.
Direct mode (the default): the project's `.venv`, under the OS sandbox.
Containerized mode: declaring `[tool.lightcone.image]` in
`pyproject.toml` switches the project over — recipes run inside a
content-addressed image built from that declaration.

## Image

Containerized mode's execution world: a base (digest-pinned), optional
apt packages, and the pinned interpreter. Built by `lc build` and saved
**into the repository** as versioned content, so clones obtain the
exact bytes through git-annex with no registry involved. Execution pins
the image's content id, never a tag.

## Runtime

The OCI tool that executes containers. Detected, never configured:
`podman-hpc`, then `podman`, then `docker` (skipped if its daemon is
down).

## Sandbox

The isolation every recipe and every `lc run` command executes under —
Landlock on Linux, Seatbelt on macOS, the container boundary in
containerized mode. The project tree is read-only apart from the
directory the output being made lands in; undeclared tools don't
execute. Each
manifest's `hermeticity` field records what was actually enforced, and
a host with no mechanism says so rather than pretending.

## git-annex

How the repository carries data: git holds history and small files,
git-annex holds the bytes of `data/` and `results/` behind ordinary
git commands. You never run git-annex yourself except to fetch bytes
on a clone (`git annex get`), and `lc materialize` even does that for
declared inputs it needs.

## Run record

The commit message a materialized output is saved under — a
machine-readable record of the exact command that made it, in a format
`datalad rerun` can replay: it reconstructs the engine, the project
environment, and the sandbox, and remakes the output from its spec.
Your `git log` is the build log.

## RO-Crate

The publication view. Declare a `license` under `[project]` in
`pyproject.toml` and every materialize maintains
`ro-crate-metadata.json` — a machine-readable description of the
project, its outputs, and the runs that produced them, following the
Provenance Run Crate profile. The metadata describes the repository. A complete
deposit also needs the actual data and output files: `git archive` alone does
not include git-annex content.

## Prior insight

A piece of evidence from the literature that informs a decision.
Lives in the `prior_insights:` section of `astra.yaml`, with a `claim`
and verifiable `evidence` (DOI plus exact quote).

## Finding

A conclusion drawn *from* the analysis (as opposed to a prior insight,
which comes *into* it). Findings live in the `findings:` section and
cite specific outputs as evidence — the bridge between materialized
results and the eventual paper.
