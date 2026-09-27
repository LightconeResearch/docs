# Lightcone Research Stack

The **Lightcone Research Stack** is [Lightcone Research][lr]'s tooling for research
analyses described with [**ASTRA**][astra] (Agentic Schema for Transparent Research
Analysis).  
You describe an analysis in an `astra.yaml` specification; the stack validates it and
takes care of the rest — execution, environments, and provenance.

!!! warning "Alpha development"
    The stack is in **early alpha**. Its tools are still moving — expect breaking
    changes between minor versions. Bug reports, design challenges, and use cases the
    tooling doesn't yet cover are exactly what we want to hear at this stage; please
    open an issue on the [repository](https://github.com/LightconeResearch) of the tool
    concerned.

## Choose your path to the documentation

<div class="grid cards" markdown>

-   __I want to try it out__ – :lucide-rocket:

    ---

    Installation instructions, step-by-step tutorial, and fast tour of the lightcone framework and its workflow capabilities.

    [User Guide](user/index.md){ .md-button .md-button--primary }

-   __I want to contribute__ – :lucide-cog:

    ---

    In-depth tour of lightcone-cli's architecture and internals, as well as contribution instructions, aimed at
    contributors and maintainers.

    [Developer corner](maintainer.md){ .md-button .md-button--primary }

</div>

---

## Components of the stack

<div class="grid cards" markdown>

-   __lightcone-cli__

    The library that ships the `lc` CLI: project scaffolding, locked environments, sandboxed execution, and the provenance layer. Depends on [**astra-tools**][astra-tools], the SDK for working with ASTRA analysis specifications.

    [:fontawesome-brands-github: Repository][cli]{ .md-button }

-   __astra-tools__

    The SDK for working with [**ASTRA**][astra] analysis specifications. This library provides the `astra` CLI which handles the [**ASTRA**][astra] lifecycle and validation process (schema, prior insights & findings, evidence verification helpers).

    [:fontawesome-brands-github: Repository][astra-tools]{ .md-button }

</div>

[lr]: https://lightconeresearch.org/
[astra]: https://astra-spec.org/latest/
[astra-tools]: https://github.com/LightconeResearch/astra-tools
[cli]: https://github.com/LightconeResearch/lightcone-cli
