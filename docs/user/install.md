# Install Lightcone

Install the `lc` command, then add the agent plugin if you want to work with
an assistant. You need **git and uv** on Linux or macOS. On Windows, use a
Linux environment under WSL.

!!! info "Preview installation"
    These docs follow the upcoming explicit compute workflow. The installation
    below pins [the preview source](https://github.com/LightconeResearch/lightcone-cli/tree/835de9e7c2df726722ffff8c6863d6f9b16ee577),
    which includes `lc compute`. The PyPI releases, including `0.5.0rc4`,
    do not yet include that command.

## 1. Install uv

If `uv --version` already reports version **0.12 or newer**, skip this step.
Otherwise, run the [official uv installer](https://docs.astral.sh/uv/getting-started/installation/):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Restart your terminal so it can find `uv`, then check that git is available:

```bash
uv --version
git --version
```

If git is missing, follow the [git installation instructions](https://git-scm.com/install/)
for your operating system. uv installs and manages Python for you.

## 2. Install Lightcone

```bash
uv tool install 'lightcone-cli @ git+https://github.com/LightconeResearch/lightcone-cli.git@835de9e7c2df726722ffff8c6863d6f9b16ee577'
lc --version
lc compute --help
```

This installs `lc` and its dependencies in an isolated tool environment,
including the git-annex executables needed to store project data. There
is no separate Python, ASTRA, or container setup for the first analysis.

??? info "Supported platforms"
    The bundled git-annex wheels require Linux with glibc 2.34 or newer
    (x86_64 or aarch64), macOS 14 or newer on Apple silicon, or macOS 15
    or newer on Intel. For Windows, run the installation and analysis
    commands inside WSL.

If your terminal cannot find `lc`, run `uv tool update-shell` and open a
new terminal. If you already have an unrelated shell alias named `lc`,
remove or rename it first.

## 3. Check your git identity

Lightcone commits the outputs it produces. If you already make git commits
on this machine, you can skip this step. Otherwise, set your own name and
email:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.org"
```

**You're ready.** Continue to [Your first analysis](getting-started.md),
or add the agent plugin below.

## Add an agent (optional)

Use an existing installation of Claude Code or Codex. Register the Lightcone
marketplace and install the **`lightcone`** plugin:

=== "Claude Code"

    Run in your terminal:

    ```bash
    claude plugin marketplace add LightconeResearch/agent-skills
    claude plugin install lightcone@lightcone-research
    ```

    Start a new session and invoke `/lightcone:lightcone`.
    See [Claude Code's plugin documentation](https://code.claude.com/docs/en/discover-plugins)
    for plugin management.

=== "Codex"

    Run in your terminal:

    ```bash
    codex plugin marketplace add LightconeResearch/agent-skills
    codex plugin add lightcone@lightcone-research
    ```

    Start a new session and invoke `$lightcone:lightcone`.
    If your Codex version does not offer `plugin add`, use its plugin browser
    to install `lightcone` from the added marketplace. See
    [OpenAI's marketplace documentation](https://developers.openai.com/plugins/build/plugins#add-a-marketplace-from-the-cli)
    and [plugin installation guidance](https://developers.openai.com/learn/developers-codex-plugin#install-the-plugin).

The plugin bundles the Lightcone and ASTRA skills, including validation
hooks. **Do not install the `astra` plugin alongside it**: that skill is
already included. The plugin uses `uvx` to fetch its pinned ASTRA tools on
first use.

The current plugin was written for the earlier CLI release. For the preview's
compute commands, use the workflow in these docs and the installed CLI's
`--help`. Continue to [Work with an agent](agents.md).

## Optional tools for later

| When you need it | What to add |
| --- | --- |
| A project needs system libraries in a container | Podman or Docker; see [execution environments](concepts.md#two-execution-environments) |
| You want more local resources or a Slurm allocation | A compute catalog; see [Running on a cluster](cluster.md) |
| You want to inspect or validate ASTRA by hand | Use `uvx astra-tools@0.2.18`; see [ASTRA tools](astra.md#validate-and-inspect) |
| You want to preview an interactive report | MyST and its Node.js runtime; see [Write a report](reporting.md) |

## Update or remove Lightcone

This preview is pinned so everyone following the tutorial gets the same
CLI. To move to another preview commit or a published release, run
`uv tool install` with that version or source. Check its release notes
before changing the version used for an ongoing project.

To remove the command:

```bash
uv tool uninstall lightcone-cli
```

Your project files and their git history remain on disk.
