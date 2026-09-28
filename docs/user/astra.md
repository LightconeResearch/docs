# ASTRA: the analysis specification

ASTRA is the **external, open specification** that Lightcone uses to describe
an analysis. It has its own documentation, schema, and tools. You can use ASTRA
with other execution tools; Lightcone provides one way to run it and record
the results. [Read the ASTRA documentation ↗](https://astra-spec.org/latest/).

## What belongs in the specification

Your project's `astra.yaml` connects the research question to the work needed
to answer it:

| Element | What you record |
| --- | --- |
| Inputs | The datasets, files, and upstream analyses you use |
| Outputs | The metrics, figures, tables, or other artifacts you intend to produce |
| Decisions | Methodological choices, their alternatives, and the reasons for them |
| Recipes | Commands that produce outputs from declared inputs and choices |
| Prior insights | Existing claims and evidence that inform your approach |
| Findings | Claims supported by the analysis's outputs |
| Universes | A selection of decision options to evaluate together |

Start with the inputs, outputs, and decisions you need for one result. Add
evidence as the research develops. The
[ASTRA format reference ↗](https://astra-spec.org/latest/specification/)
explains the fields and how they fit together.

## How Lightcone uses it

The [Lightcone agent skills](agents.md) help you draft and revise the spec.
The `astra` tools validate its structure and evidence. The `lc` CLI executes
its recipes and tracks the resulting artifacts.

For an output that `lc` will execute, declare a `format`, a `recipe.command`,
and its input and decision dependencies. The command must write one file to
the `{output}` path supplied by `lc`. See [Your first analysis](getting-started.md)
for a complete working example.

ASTRA also supports composing sub-analyses. This Lightcone CLI preview executes
flat analyses; use a single analysis with sibling outputs for its recipes.

Keep the `version:` field written by `lc init`: it comes from the installed
ASTRA schema. It is a schema version, separate from the `lc` and `astra-tools`
package versions.

## Validate and inspect

You can run the ASTRA tools through `uvx`, which downloads and caches the
tool environment on first use. These examples use the version required by
the current Lightcone CLI and bundled agent skill:

```bash
uvx astra-tools@0.2.18 validate
uvx astra-tools@0.2.18 info
uvx astra-tools@0.2.18 spec Output
```

Run these from your project directory. With no filename, `validate` checks
the project's specs and universe files. For literature-backed claims, add
`--verify-evidence` to check supporting quotations against their sources:

```bash
uvx astra-tools@0.2.18 validate astra.yaml --verify-evidence
```

The agent plugin runs ASTRA tools with its own version pin and includes a
validation hook for supported agents. Installing Lightcone alone does not
put the separate `astra` command on your shell's `PATH`; `uvx` avoids needing
another installation.

## Continue with ASTRA

- [ASTRA getting started ↗](https://astra-spec.org/latest/getting-started/) — learn the format independently of Lightcone.
- [Specification reference ↗](https://astra-spec.org/latest/specification/) — decisions, evidence, composition, and field definitions.
- [ASTRA CLI reference ↗](https://astra-spec.org/latest/cli/) — validation, universes, and paper utilities.
- [ASTRA tools source ↗](https://github.com/LightconeResearch/astra-tools) — the Python CLI and SDK.
