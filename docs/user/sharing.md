# Share your work

A useful research handoff includes the analysis, the files it produced, and the
record of how those files were made. Lightcone can maintain a machine-readable
[RO-Crate](https://www.researchobject.org/ro-crate/) description of that project.
Creating this metadata prepares your work for sharing; depositing it in an
archive or publishing a report is a separate step.

## Prepare the project

Review the authorship recorded in `astra.yaml`, the explanation in your
[report](reporting.md), and the project license. To enable RO-Crate maintenance,
add the license you have chosen under the existing `[project]` section of
`pyproject.toml`. For example, for a project you intend to release under CC BY 4.0:

```toml
license = "CC-BY-4.0"
```

Commit your edits, then materialize using an allocated cluster:

```bash
git add astra.yaml pyproject.toml index.md myst.yml
git commit -m "Prepare the analysis for sharing"
lc materialize CLUSTER_ID
```

Replace `CLUSTER_ID` with the id returned by `lc compute launch`; an existing
allocation is fine. See [compute setup](cluster.md) to launch one. Materialize
runs any outputs that need work and updates `ro-crate-metadata.json` in a trailing
commit. If the outputs are already current, they are left in place.

Check the result:

```bash
uvx astra-tools@0.2.18 validate
lc materialize --check
lc status
git status --short
```

Resolve validation and build failures, confirm `ro-crate-metadata.json` exists,
and read any crate warnings. Review `behind` outputs explicitly: they satisfy
the current analysis definition but were produced under an earlier environment,
and the default check can pass with them present. The [status
reference](../cli/status.md) explains these states.

## Include the actual data

Git carries your specification, code, manifests, and history. Large files tracked
by git-annex can be represented in Git by pointers, with their contents stored
elsewhere. A Git clone or `git archive` alone does not guarantee that a recipient
has the input data, result files, or container image bytes.

For a collaborator continuing the analysis, share the repository **and** an
accessible annex storage location. Tell them where to retrieve the data; a
successful clone only proves that the Git history was transferred.

For a file archive, first retrieve the content you intend to include, then use
[DataLad's archive exporter](https://docs.datalad.org/en/stable/generated/man/datalad-export-archive.html).
From the project root:

```bash
git annex get .
uvx datalad export-archive --missing-content error ../analysis.tar.gz
```

The exporter runs through `uvx`; DataLad does not need a separate permanent
installation. Keeping `--missing-content error` makes missing file content stop
the export. The archive is written outside the project so it does not become a
new analysis input. Inspect its contents and extract a copy to check the expected
inputs, outputs, manifests, and `ro-crate-metadata.json` before handing it off.

This is a snapshot of dataset files. Keep the Git repository available separately
when collaborators need commit history or the recorded DataLad run commands.

## Hand off the work

Share the checked archive through your chosen repository or archival service,
with the report and the analysis version it describes. Hosting `_build/html/`
shares a readable report; sharing the project and its data lets someone inspect
and continue the analysis. Record the destination and citation in the project
once the deposit exists.

No Lightcone command above uploads your files or creates a DOI. The local
RO-Crate describes the research object you are preparing to share.
