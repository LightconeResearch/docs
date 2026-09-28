# Meet the research stack

Lightcone connects a research question to a record of how you answered it. You describe the analysis, write the code, and run it; the tools keep track of the methodological choices, inputs, environment, and outputs along the way.

Start with [installation](install.md) and [your first analysis](getting-started.md). Add the agent plugin if you want an assistant to help you work through the same workflow.

## What each piece does

| Piece | What you use it for | Where it lives |
| --- | --- | --- |
| **Lightcone CLI** (`lc`) | Create a project, run recipes, inspect result status, and record provenance. | [lightcone-cli](https://github.com/LightconeResearch/lightcone-cli) |
| **Lightcone agent plugin** | Help your coding agent scope a question, maintain a specification, implement recipes, and resume work. Includes the ASTRA skill and validation hooks. | [agent-skills](https://github.com/LightconeResearch/agent-skills) |
| **ASTRA specification and tools** — external | Describe the analysis in `astra.yaml`; validate its structure and inspect its decisions and evidence with `astra`. | [ASTRA documentation ↗](https://astra-spec.org/latest/) · [astra-tools ↗](https://github.com/LightconeResearch/astra-tools) |

ASTRA has its own specification, releases, and documentation. Lightcone builds on it. This site covers [how ASTRA fits into your project](astra.md); the external ASTRA documentation is the reference for the schema and its tools.

The agent plugin is optional. Your specification is ordinary YAML and your recipes run your own scripts, so you can use the same project with or without an assistant.

## From a question to a result

1. **Describe the work.** Record the question, inputs, expected outputs, and methodological decisions in `astra.yaml`. An [agent can help you scope it](agents.md).
2. **Implement the analysis.** Write scripts, add dependencies with `uv add`, and connect each output to a recipe in the specification.
3. **Run and inspect.** Commit your changes, materialize the outputs with `lc`, and inspect their status. Each recorded result carries the information needed to trace how it was produced.
4. **Compare choices.** Create a *universe* for each combination of decision options you want to study. [Core concepts](concepts.md) explains how those alternatives relate to outputs.
5. **Communicate the result.** [Write a report](reporting.md) and [prepare the project for sharing](sharing.md), keeping the result connected to its provenance.

You remain responsible for the scientific argument: which alternatives are defensible, whether a method answers the question, and what the results support. A valid specification and a reproducible run make that argument easier to inspect.

## Find the help you need

| I want to… | Start here |
| --- | --- |
| Get the tools running | [Install](install.md) |
| Follow a complete example | [Your first analysis](getting-started.md) |
| Start or resume with a coding agent | [Work with an agent](agents.md) |
| Understand decisions, universes, and output status | [Core concepts](concepts.md) |
| Run on an HPC system | [Run on a cluster](cluster.md) |
| Resolve an error | [Troubleshooting](troubleshooting.md) |
| Look up a command | [CLI reference](../cli/index.md) |
| Work on the tools themselves | [Contribute](../maintainer.md) |
