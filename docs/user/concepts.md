# Core concepts

A Lightcone project brings your research question, analysis choices, code, data,
and results together in one versioned directory. Agent skills help you develop
and review that project; `lc` runs the analysis and records how each result was
made. The analysis specification follows **ASTRA, an external standard** with
its own [documentation and tooling](https://astra-spec.org/latest/).

## The project is the research record

| File or directory | What it holds |
|---|---|
| `astra.yaml` | Inputs, outputs, recipes, methodological decisions, and evidence |
| `universes/` | Selections of decision values to evaluate |
| `pyproject.toml` and `uv.lock` | The analysis dependencies and their resolved versions |
| `data/` | Input data, with large content stored through git-annex |
| `results/` | Generated outputs and their provenance manifests |
| `index.md` and `myst.yml` | The report and its MyST configuration |

Keep your analysis code in the layout that suits your project, such as `src/`.
Add its dependencies with uv:

```bash
uv add numpy
```

The project environment is separate from the installed `lc` tool. Recipes use
packages from your lock file; installing a package elsewhere does not add it to
the analysis. After cloning a project, `lc init` reconstructs the local
environment and initializes git-annex. Annexed data may still need fetching;
materialization fetches the declared inputs it needs.

## Decisions become universes

A decision records a methodological choice, its defensible options, and your
reasoning. A universe selects values for those decisions. For example, `baseline`
might keep all observations while `robust` excludes outliers. Lightcone produces
separate results for each universe, so you can compare how the choice affects
your findings.

ASTRA defines the schema, validation rules, and universe semantics. Lightcone
uses those definitions to execute recipes. See the [glossary](glossary.md)
for the individual terms.

## Choose compute, then execute

Compute is separate from the research record. Launch a local or Slurm allocation
with `lc compute`, then pass its ID to `lc materialize` or `lc run`. A small
local offer is available without configuration; a user-level catalog exposes
larger allocations and HPC services.

```bash
lc materialize "$CLUSTER"
lc status
lc compute down "$CLUSTER"
```

Here `CLUSTER` is the ID returned by `lc compute launch`. A finished command
leaves the allocation available for reuse until you stop it or its lifetime
expires. [Compute and clusters](cluster.md) walks through the full lifecycle.
The project and environment must be visible at the same paths to the driver
and workers.

## What makes an output current?

Every output has a manifest beside it: `.<output_id>.manifest.json`. It records
the recipe and selected decisions, input content hashes, the environment, and
the Git commit at the start of the run.

| State | Meaning | Next materialization |
|---|---|---|
| `current` | Definition, inputs, and environment match the recorded result | Leaves it alone |
| `stale` | Definition or input content changed, or a result was committed outside its run record | Remakes it |
| `behind` | Definition and inputs match, but the environment changed | Leaves it alone unless you use `--refresh` |

Input changes propagate by content. If rebuilding an upstream result produces
identical bytes, it does not force a downstream rebuild. Changing a dependency
in `uv.lock` makes existing results `behind`, so an unrelated package update
does not automatically repeat expensive work. To refresh those results:

```bash
lc materialize "$CLUSTER" --refresh
```

Source code does not automatically participate in the definition hash. Declare
scripts as ASTRA inputs when their content should trigger a rebuild. A recipe
can then refer to a script through its input placeholder.

## Commit before running

Materialization starts from a clean Git tree so each result has a precise code
revision. Review and commit your edits before running. The driver then commits
each successful output with its manifest and a replayable run record. Git
stores the history and small files; git-annex stores the larger data bytes.

A recipe that reports failure has its partial result restored. After a lost
connection or interrupted command, remote recipes may still be writing. Stop
the allocation and confirm they have stopped before cleaning `results/`.
[Execution limits](cluster.md#execution-requirements-and-limits) explain this
case, including local containers that may require separate termination.

Use one execution command per project at a time. Treat `results/` as generated
content; keep hand-written analysis and report files outside it.

## Two execution environments

In **direct mode**, recipes use the project's prepared environment on an
allocation worker. On supported hosts, filesystem access is constrained by
Landlock on Linux or Seatbelt on macOS. Recipes may write in their output
directory and private scratch space.

In **containerized mode**, a `[tool.lightcone.image]` table in `pyproject.toml`
declares the system layer. `lc build` saves that image in the repository through
git-annex; Python dependencies still come from the project lock. See
[`lc build`](../cli/build.md) for the declaration and runtime requirements.

Every manifest records the isolation actually enforced. A host without a
supported sandbox reports that fact. Network access remains allowed.

## Inspect results without running them

`lc status` shows each result's state and provenance commit. A successful report
exits 0 even if outputs are stale. `lc materialize --check` is the automation
gate: it exits 1 when work would be needed. Neither command needs a cluster or
fetches data, and both accept `--json`.

## Reports and publication metadata

Write the research narrative in the project's MyST report and reference the
outputs that support your findings. Declaring a license under `[project]` in
`pyproject.toml` also enables maintenance of `ro-crate-metadata.json`, a
machine-readable description of the project and its provenance.

That metadata helps archives and other tools understand the research record.
A complete deposit must include the data and result bytes as well as the
metadata: `git archive` alone does not include git-annex content.
