# Your first analysis

Build a small analysis that answers one question: **how much does the choice
of estimator change a result?** You will summarize five measurements using
the mean and the median, then inspect both results and the record of how
they were made.

Complete the [installation](install.md) first. This example uses Python's
standard library, runs locally, and needs no container or external dataset.
If you prefer to start from your own research question with an assistant,
follow [Work with an agent](agents.md).

## 1. Create the project

```bash
lc init first-analysis
cd first-analysis
```

Lightcone creates the project files, a managed Python environment, and a
git repository configured to store data and results. The files you will
work with are:

| File or directory | Your use |
| --- | --- |
| `astra.yaml` | Describe the inputs, outputs, and methodological choices |
| `universes/` | Select the choices to run |
| `data/` | Keep the input measurements |
| `src/` | Write the analysis scripts; you will create this directory |
| `pyproject.toml` and `uv.lock` | Declare and lock the project's dependencies |
| `results/` | Read the outputs produced by Lightcone |
| `index.md` and `myst.yml` | Develop a report when you are ready |

Run the remaining commands from this project directory.

## 2. Add the data and script

Create the input file and a script that accepts the estimator as an argument:

```bash
mkdir -p src
cat > data/measurements.txt <<'EOF'
1
2
3
4
18
EOF

cat > src/estimate.py <<'EOF'
import argparse
import json
import statistics
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("--data", required=True)
parser.add_argument("--method", choices=["mean", "median"], required=True)
parser.add_argument("--output", required=True)
args = parser.parse_args()

values = [float(line) for line in Path(args.data).read_text().splitlines()]
estimator = statistics.mean if args.method == "mean" else statistics.median
result = {"method": args.method, "estimate": estimator(values), "n": len(values)}
Path(args.output).write_text(json.dumps(result, indent=2) + "\n")
EOF
```

For your own scripts, add packages with `uv add`, for example
`uv add numpy`. Lightcone runs recipes in the environment described by the
project's lockfile.

## 3. Describe the analysis

Replace the example contents of `astra.yaml` with the following. Keep the
`version:` value written by `lc init` if it differs from this example:

```yaml title="astra.yaml"
version: "0.0.14"
name: Estimator comparison
description: Compare the mean and median of five measurements, including a large value.

inputs:
  - id: measurements
    type: data
    source: data/measurements.txt
    description: Five example measurements.
  - id: estimator_script
    type: data
    source: src/estimate.py
    description: Implementation of the two estimators.

outputs:
  - id: estimate
    type: metric
    format: json
    description: Estimated central value and number of measurements.
    inputs: [measurements, estimator_script]
    decisions: [estimator]
    recipe:
      command: >-
        python {inputs.estimator_script}
        --data {inputs.measurements}
        --method {decisions.estimator}
        --output {output}

decisions:
  estimator:
    label: Choice of estimator
    rationale: The mean and median respond differently to extreme measurements.
    default: mean
    options:
      mean:
        label: Arithmetic mean
      median:
        label: Median
```

The script is a declared input too, so changing its contents makes the
result need rebuilding. The recipe receives the selected decision and the
output filename from Lightcone.

Replace `universes/baseline.yaml` and add `universes/robust.yaml`:

```bash
cat > universes/baseline.yaml <<'EOF'
id: baseline
description: Summarize the measurements using the mean.
decisions:
  estimator: mean
EOF

cat > universes/robust.yaml <<'EOF'
id: robust
description: Summarize the measurements using the median.
decisions:
  estimator: median
EOF
```

Each file defines a **universe**: one set of methodological choices. Both
use the same data and script. Validate the spec and both universes:

```bash
uvx astra-tools@0.2.18 validate
```

## 4. Make the results

Commit the project files before running. Lightcone uses this commit to
identify the analysis that produced each result:

```bash
git add astra.yaml universes/ src/ data/ pyproject.toml uv.lock \
  .python-version .gitignore .gitattributes .datalad/ myst.yml index.md results/README.md
git commit -m "Define the estimator comparison"
```

Request a small local allocation, wait until it is ready, and run the
analysis. The built-in offer is configured for 1 CPU and 1 GiB of memory
without a compute configuration file:

```bash
CLUSTER_ID=$(lc compute launch --cpus 1 --memory 1 --json | \
  uv run --locked python -c 'import json, sys; print(json.load(sys.stdin)["id"])')
lc compute status "$CLUSTER_ID" --wait
lc materialize "$CLUSTER_ID"
```

Keep this terminal open: `CLUSTER_ID` identifies the allocation for later
commands. If you already configured a compute catalog, the request uses
that catalog's offers instead; inspect them with `lc compute resources`.

Lightcone runs the recipe once for each universe and commits each output
with its provenance manifest. It chooses the result paths:

```text
results/
├── baseline/
│   ├── estimate.json
│   └── .estimate.manifest.json
└── robust/
    ├── estimate.json
    └── .estimate.manifest.json
```

The message about a missing project license does not prevent execution.
You can add a license when you prepare the project for sharing.

## 5. Compare and inspect

```bash
cat results/baseline/estimate.json
cat results/robust/estimate.json
lc status
lc materialize --check
git log --oneline -3
```

| Universe | Estimator | Result |
| --- | --- | --- |
| `baseline` | Mean | `5.6` |
| `robust` | Median | `3.0` |

The difference shows the effect of the large measurement under these two
choices. Both results should be `current`, and `lc materialize --check`
should succeed. Each manifest records the inputs, decisions, command,
environment, and producing commit.

Run the same command again to see matching outputs reused, then release
the allocation:

```bash
lc materialize "$CLUSTER_ID"
lc compute down "$CLUSTER_ID"
```

Release the allocation with `lc compute down "$CLUSTER_ID"` even if a recipe
fails. You can always inspect allocations with `lc compute status` if you
lose the shell variable.

To try a change, edit `data/measurements.txt` and commit that file. Launch
another allocation with the commands in step 4, materialize, and release
it when finished. Both universes will use the new data.

## Continue with your research

- [Work with an agent](agents.md) to scope a larger question or bring in existing code.
- [Core concepts](concepts.md) explains decisions, universes, and result states.
- [ASTRA](astra.md) introduces evidence and links to the external specification.
- [Write a report](reporting.md) connects the narrative to your analysis and results.
- [Share an analysis](sharing.md) explains publication metadata and transferring result files.
- [Running on a cluster](cluster.md) covers larger compute allocations.
- [Troubleshooting](troubleshooting.md) helps with installation and execution errors.
