# Troubleshooting

Start with the command's error message and `lc --version`. The installation
and examples on this site target the compute-enabled development version;
follow the [installation guide](install.md) if your CLI has a different surface.

## "lc: command not found" or `lc` prints a directory listing

Check what your shell resolves:

```bash
type lc
uv tool update-shell
```

Open a new shell after updating its configuration. If a personal alias such as
`lc='ls --color'` hides the command, remove it with `unalias lc`.

## "No such command 'compute'"

You have a CLI release from before explicit compute allocation. Install the
source version in the [installation guide](install.md), then verify:

```bash
lc compute --help
```

## Missing or unavailable cluster

Execution requires the ID returned by `lc compute launch`. Check its state before
running the project:

```bash
lc compute status "$CLUSTER" --wait
lc materialize "$CLUSTER"
```

Here `CLUSTER` must contain your allocation's ID. Follow
[Compute and clusters](cluster.md#start-locally) if you have not launched one.
For a read-only check, omit the ID: `lc materialize --check`.

A readiness timeout leaves the allocation in place. Inspect its status before
launching another. If it has ended, launch a new allocation. Keep the catalog
connection that created it, and use the same `LC_COMPUTE_CONFIG` for launch and
execution. If submission reports a token with an uncertain result, inspect
existing allocations before retrying.

## "uncommitted changes in …"

Materialization records the code revision that produced each result. Review
and commit your analysis edits before running:

```bash
git status
git add astra.yaml src/ pyproject.toml uv.lock
git commit -m "Update analysis"
```

Adjust the paths to your own edits. Files under `results/` need separate care:
those are generated outputs, not research code to commit by hand. If an earlier
run was interrupted, stop its allocation and confirm its recipes have stopped
before cleaning partial results. See
[execution limits](cluster.md#execution-requirements-and-limits).

## "… is not a Lightcone project"

Project commands inspect the current directory, without searching parent
folders. Move to the directory containing your project:

```bash
cd path/to/your/project
```

For a fresh clone, run `lc init` to reconstruct the environment and initialize
git-annex. To start a new project, use `lc init my-analysis`.

## A recipe fails with "Permission denied" or "No module named …"

Recipes use the project's locked environment and filesystem sandbox. Check
these common causes:

| Symptom | Fix |
|---|---|
| Missing Python package | Run `uv add PACKAGE`, commit the dependency changes, and rerun. |
| Cannot read data outside the project | Declare the file as an ASTRA input; workers also need access at that path. |
| Cannot write a file | Write the product to `{output}` and use `tempfile.mkdtemp()` for scratch files. |

Probe imports or a script with `lc run "$CLUSTER" -- COMMAND`. A probe uses
the same environment and dependency rules, with a broader write scope under
`results/`. It does not forward interactive input or record result provenance.
Remove probe files before materialization.

## Everything shows `behind` after a `uv add`

`behind` means the result still matches its definition and inputs, while the
environment changed. Lightcone keeps it with its original provenance. To rebuild
behind results under the current environment:

```bash
lc materialize "$CLUSTER" --refresh
```

## Everything shows `stale` after a spec edit

A result becomes `stale` when its recipe, selected decisions, or declared input
content changes. Materialization remakes the affected outputs. A committed manual
edit to a generated output or manifest is also stale.

Changing a script does not automatically invalidate its outputs. Declare the
source file as an ASTRA input when its content should trigger a rebuild.
See [Core concepts](concepts.md#what-makes-an-output-current).

## "the content is not in this clone"

Git-annex has a reference to a file whose bytes are not present locally.
Materialization fetches the declared inputs it needs. Read-only commands do not
transfer data. To inspect a file yourself, fetch it explicitly:

```bash
git annex get data/points.csv
```

This requires a reachable source that holds the content. A Git remote alone
does not guarantee that the annexed bytes are available.

## "fatal: … clean filter 'annex' failed"

Git cannot find or run git-annex. This can affect `git add`, `git status`, and
other commands that use the annex filter. `lc init` marks the filter as required
so a failure cannot silently put large data files into ordinary Git history.

```bash
git-annex version
uv tool update-shell
```

If git-annex is missing, follow the [installation guide](install.md) to install
Lightcone as a uv tool, then open a new shell. A one-off `uvx` invocation does
not install git-annex onto your shell's `PATH`.

## Selecting compute from a login shell

Use your facility's Slurm offers in the compute catalog. The development CLI
does not reject local allocations by inspecting login-node names or site
markers; allocation choices are explicit. Configure the appropriate offers and
follow your facility's usage policy. See [Slurm setup](cluster.md#configure-slurm).

## git doesn't know who you are

Set your Git identity before the first result commit:

```bash
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.org"
```

Use your own name and email.

## Containerized projects

| Problem | Next step |
|---|---|
| Image absent | Run `lc build`; materialization can also build a missing image as a preflight. |
| No container runtime | Provide Podman, Docker, or podman-hpc on the machines that need it. |
| Architecture mismatch | Build the image on a host with the architecture of the execution workers. |
| Image unavailable on a worker | Make the prepared image available on every worker; the cluster does not distribute node-local image stores automatically. |

See [`lc build`](../cli/build.md) for the image declaration and lifecycle.

## Agent skills or ASTRA validation

If your agent cannot find a skill, check the plugin installation in
[Using an agent](agents.md). The `lightcone` plugin already bundles the ASTRA
skill, so a second ASTRA plugin is unnecessary.

Schema and evidence-validation errors come from the external ASTRA tooling.
Use [Working with ASTRA](astra.md) to find the authoritative schema reference
and validation commands.

## Filing a bug

For execution errors, open an issue in
[lightcone-cli](https://github.com/LightconeResearch/lightcone-cli/issues) with
the version, command, and complete error message. For plugin behavior, use
[agent-skills](https://github.com/LightconeResearch/agent-skills/issues).
