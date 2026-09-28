# Contribute to Lightcone

Lightcone's documentation, agent skills, and execution tools live in separate
repositories. Start with the repository that owns the behavior you want to change.

| Contribution | Repository | Start here |
|---|---|---|
| Guides, installation, navigation, or site design | [LightconeResearch/docs](https://github.com/LightconeResearch/docs) | [Build the documentation](contributing/setup.md#documentation-site) |
| Agent instructions, plugin packaging, or validation hooks | [LightconeResearch/agent-skills](https://github.com/LightconeResearch/agent-skills) | [Work on agent skills](contributing/setup.md#agent-skills) |
| Project execution, environments, provenance, or CLI behavior | [LightconeResearch/lightcone-cli](https://github.com/LightconeResearch/lightcone-cli) | [CLI development](contributing/setup.md#lightcone-cli) |
| Analysis schema or ASTRA tooling | External [ASTRA project](https://astra-spec.org/latest/) | Follow ASTRA's own documentation and contribution process |

For research work, start with the [user guide](user/index.md). You do not need
the developer tools below to use Lightcone.

## CLI internals

The [architecture guide](architecture.md) explains how the execution engine
uses ASTRA, uv, Git, git-annex, and its sandbox. The [engine reference](api/index.md)
maps responsibilities to modules; it is intended for contributors, rather than
as a supported Python API for research projects.

Read [Testing](contributing/testing.md) before changing the engine and
[Extending](contributing/extending.md) to find where a change belongs.
The [CLI reference](cli/index.md) documents the user-facing contract.

## Keep the stack consistent

When changing behavior, update the matching instructions and examples. Check
installation commands against the version documented by this site and the tool
pins in the agent-skills repository. Document an external dependency as external;
ASTRA's schema and validation semantics remain the ASTRA project's responsibility.

Keep errors actionable, record the enforcement actually used, and keep research
projects independent of the engine's Python internals. Code, tests, and their
dependencies should land together.
