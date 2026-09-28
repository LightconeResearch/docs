# Work with an agent

Describe the research you want to do, then work with your agent to turn it
into a reviewable analysis. The Lightcone plugin gives a compatible coding
agent guidance for scoping a question, recording methodological choices,
writing recipes, running the analysis, and preparing a report.

**Start here:** [install Lightcone and the optional agent plugin](install.md#add-an-agent-optional).
The `lightcone` plugin includes both the Lightcone and ASTRA skills, along
with their hooks. You only need that one plugin for the full workflow.

!!! note "Using the compute preview"
    The current plugin targets `lightcone-cli` version `0.5.0rc4`; these docs
    follow the upcoming compute workflow. Tell your agent to use the installed
    CLI's `--help`: execution now needs an allocation from `lc compute launch`,
    followed by `lc run CLUSTER_ID -- COMMAND` or `lc materialize CLUSTER_ID`.
    Release it with `lc compute down CLUSTER_ID` when finished. The
    [first analysis](getting-started.md#4-make-the-results) shows the full sequence.

## Start a project

Create a project, then open your agent in that directory:

```bash
lc init my-analysis
cd my-analysis
```

Invoke the Lightcone skill and describe your question. For example:

=== "Claude Code"

    ```text
    /lightcone:lightcone
    I want to measure how sensitive my result is to the treatment of
    outliers. My data is in data/measurements.csv. Help me define the
    question, outputs, and methodological choices before implementing it.
    ```

=== "Codex"

    ```text
    $lightcone:lightcone
    I want to measure how sensitive my result is to the treatment of
    outliers. My data is in data/measurements.csv. Help me define the
    question, outputs, and methodological choices before implementing it.
    ```

Replace the example data path with a file you have actually provided.
The skill is designed to start with the scientific question and record the
answers in `astra.yaml`. Review the proposed outputs, decision options,
and baseline before asking the agent to implement them.

If you already have scripts or a notebook, start with those:

```text
Read the existing analysis in notebooks/exploration.ipynb. Identify its
inputs, outputs, and consequential methodological choices. Help me capture
them in astra.yaml and turn the first result into a reproducible recipe.
```

## Move from a question to results

| Stage | What to ask for | What you can review |
| --- | --- | --- |
| Scope | Clarify the question, data, intended outputs, and plausible alternatives | `astra.yaml` and the baseline universe |
| Ground | Read relevant papers and connect evidence to methodological choices | Prior insights with checkable quotations |
| Implement | Write one recipe at a time, with decision values passed as arguments | Scripts, declared dependencies, and test runs |
| Execute | Commit the analysis and materialize the requested outputs | Result files, manifests, and `lc status` |
| Interpret | Compare universes and explain what the outputs support | Findings linked to their evidence |
| Communicate | Update the report from the analysis and prepare it for sharing | `index.md`, figures, and publication metadata |

Tell the agent your compute limits and which universes you want to run.
A useful first request is one output in the baseline universe; you can
expand once you have inspected it.

## Give the agent useful context

Provide the research question, where the data lives, any existing code or
papers, and what a useful result would look like. Mention constraints such
as memory, runtime, available hardware, or methods you have already ruled out.

For example:

```text
Use the Lightcone skill. Start with the baseline result on my laptop.
Keep the run within 1 CPU and 1 GiB of memory. Explain any missing inputs
or dependencies before starting. Keep consequential methodological choices
in astra.yaml, and show me the outputs and their provenance when finished.
```

The plugin supplies workflow guidance; the tools still need to be available
where the agent runs. A remote agent environment needs its own `uv`, git,
`lc`, and access to the project and data.

## Resume an analysis

Open the agent in the existing project and ask it to orient itself:

```text
Use the Lightcone skill. Read astra.yaml, AGENTS.md if present, and lc status.
Summarize the question, decisions, existing results, and unfinished work.
Then help me add a second defensible method and compare it with the baseline.
```

`astra.yaml` holds the scientific structure. An `AGENTS.md` file can retain
working context such as data quirks, project commands, and decisions about
scope. Results and manifests retain the execution record. Together they
help a new session continue from the project itself.

For a newly cloned project, run `lc init` in its root to restore the local
environment and repository settings before working with it.

## Review the handoff

Ask the agent to finish with the result locations, what changed in the
specification, and any unresolved questions. `lc status` reports the state
of each output; `lc materialize --check` provides a check that exits
nonzero when requested outputs need work.

The [first analysis tutorial](getting-started.md) shows the commands and
files behind this workflow. [Core concepts](concepts.md) explains how
Lightcone decides whether a result needs to run again.

Continue with [Write a report](reporting.md) to connect the narrative to
the analysis, or [Share an analysis](sharing.md) to prepare it for others.

Plugin source and available skills live in
[LightconeResearch/agent-skills ↗](https://github.com/LightconeResearch/agent-skills).
