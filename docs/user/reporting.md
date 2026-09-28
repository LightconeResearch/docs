# Write a report

Your Lightcone project includes a place to explain the question, methods, and
results. `lc init` creates `index.md` for the report and `myst.yml` for its
configuration. Write your argument in Markdown, and reference the analysis's
decisions and outputs so the report follows the work as it changes.

## Preview the scaffold

Install the [MyST CLI](https://mystmd.org/guide/installing) with a current Node.js
LTS release and npm available:

```bash
npm install -g mystmd
myst --version
```

From your project directory, alongside `astra.yaml`, start the preview:

```bash
myst start
```

Open the address printed in the terminal. Replace the TODO sections in
`index.md` with your introduction, methods, and results. MyST refreshes the
preview when you save Markdown. After changing `astra.yaml`, a universe, or a
result file, save a Markdown page again or restart the preview.

The generated configuration already loads the ASTRA reporting plugin and article
theme. Keep that configuration when editing the report; there is no separate
plugin installation step.

## Reference your analysis

Use the ids from your own `astra.yaml` to mention an output or embed a decision.
For example, the [worked example](getting-started.md) declares `estimator` and
`estimate`:

````markdown title="index.md"
## Methods

:::{astra} decisions.estimator
:::

## Results

The {astra}`outputs.estimate` output records the result for each estimator.
````

For measured values, use a live value reference supported by your output format
instead of copying a number into prose. The external
[report authoring guide](https://lightconeresearch.github.io/MySTRA/authoring/)
covers values, tables, citations, and other reference forms.

## Check the report against the results

Before sharing, check the analysis:

```bash
lc status
lc materialize --check
```

If work is needed, commit your edits and run `lc materialize CLUSTER_ID` with
your allocated cluster's id. See [compute setup](cluster.md) if you need an
allocation. The report reads result files from disk; building the report does
not run analysis recipes or retrieve missing annexed results.

Then build and inspect the report:

```bash
myst build
myst build --html
```

The HTML site is written to `_build/html/`. Read the build diagnostics and check
the preview for unresolved references and missing figures or values. A successful
build alone is insufficient: some references can fall back to plain text. After
renaming an analysis element, update its references in the Markdown too. When you
have several universes, check which one the reporting plugin resolves before
interpreting its figures and numbers.

The scaffold uses unpinned plugin and theme URLs. For a report you need to
rebuild later, pin their versions in `myst.yml` and record the MyST version used;
the comments in the generated configuration show where to pin them. Reporting
is still evolving, so consult the linked authoring documentation for the version
you use.

Next: [share your work](sharing.md), including the analysis and its provenance.
