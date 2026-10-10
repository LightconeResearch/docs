import type { Metadata } from 'next';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { ArrowRight, BookOpen, Rocket } from 'lucide-react';
import { layers } from '@/components/stack-layers';
import { appName } from '@/lib/shared';

export const metadata: Metadata = {
  title: appName,
  description: 'Rigorous research, without the bookkeeping.',
};

// The excerpt from the ASTRA page, with its long strings folded to fit: one
// output, the recipe that makes it and the decision it depends on.
const astraYaml = `outputs:
  - id: fit_params
    type: table
    format: csv
    description: >-
      Slope, intercept and scatter
      for the fitted relation.
    inputs: [catalog_data]
    decisions: [fit_method]
    recipe:
      command: >-
        python src/fit_period_luminosity.py
        --catalog {inputs.catalog_data}
        --method {decisions.fit_method}
        --out {output}

decisions:
  fit_method:
    label: Fitting method
    rationale: >-
      The fitting method determines how
      outliers influence the inferred relation.
    default: ordinary_least_squares
    options:
      ordinary_least_squares:
        label: Ordinary least squares
      robust_linear:
        label: Robust linear fit`;

// Built from Fumadocs' own components (buttons, code block, steps and cards)
// in the docs' typography, so the page looks like the rest of the site.
export default function HomePage() {
  return (
    <main className="prose mx-auto w-full max-w-(--fd-layout-width) px-4 py-12 md:px-6 md:py-20">
      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1>Rigorous research, without the bookkeeping.</h1>
          <p>
            The Lightcone Stack makes it easier to do research with an AI agent, from planning an analysis to running it
            and writing up the results. It works with agents such as Claude Code and Codex, using your own code, data and
            compute.
          </p>
          <div className="not-prose flex flex-wrap gap-3">
            <Link href="/docs/quickstart" className={buttonVariants({ variant: 'primary' })}>
              Get started
              <ArrowRight />
            </Link>
            <Link href="/docs" className={buttonVariants({ variant: 'secondary' })}>
              Read the documentation
            </Link>
          </div>
        </div>
        <ServerCodeBlock code={astraYaml} lang="yaml" codeblock={{ title: 'astra.yaml' }} />
      </section>

      <h2>How it works</h2>
      <p>
        Your agent writes down the methods, choices and evidence as you work. When the analysis runs, Lightcone records
        the code, data and environment behind each result.
      </p>
      <Steps>
        <Step>
          <h3>Describe</h3>
          <p>
            Before anything runs, your agent interviews you and writes the analysis down in <code>astra.yaml</code>: its
            inputs, outputs, methodological choices and the evidence behind them.
          </p>
        </Step>
        <Step>
          <h3>Run</h3>
          <p>
            The Lightcone CLI runs each recipe in a sandbox, on your machine or a Slurm cluster, and commits every output
            next to a record of the code, data and environment that made it.
          </p>
        </Step>
        <Step>
          <h3>Trace</h3>
          <p>
            You and your collaborators can follow any result back to the work that produced it, review the reasoning and
            rerun the analysis, long after the agent&apos;s session has ended.
          </p>
        </Step>
      </Steps>

      <h2>The stack</h2>
      <p>
        Separate tools that work on one repository. Each reads the same <code>astra.yaml</code> and the same record, and
        shares nothing else: start with your agent and the CLI, and add the rest later, or not at all.
      </p>
      <Cards>
        {layers.map((layer) => (
          <Card key={layer.name} icon={<layer.icon />} title={layer.name} href={layer.href}>
            {layer.text}
          </Card>
        ))}
      </Cards>

      <h2>You and your agent</h2>
      <p>The agent does much of the work, but not the judgment.</p>
      <Cards className="md:grid-cols-3">
        <Card title="It starts with questions, not code.">
          Before anything runs, the agent interviews you and writes the analysis down in the specification, where you
          can read it.
        </Card>
        <Card title="It never writes a result itself.">
          The agent describes the analysis and drives the CLI; every output comes out of <code>lc</code>, with its
          provenance, never out of the conversation.
        </Card>
        <Card title="You own the argument.">
          You make the scientific choices and remain responsible for what the results mean. The record makes those
          choices visible, to you and to your readers.
        </Card>
      </Cards>

      <h2>Start your first analysis</h2>
      <p>Add the Lightcone plugin to Claude Code or Codex, and scope an analysis together.</p>
      <Cards>
        <Card icon={<Rocket />} title="Quick Start" href="/docs/quickstart">
          Start a reproducible research analysis with your coding agent.
        </Card>
        <Card icon={<BookOpen />} title="Your first analysis" href="/docs/guides/first-analysis">
          A complete analysis with an agent, from a research question to a report.
        </Card>
      </Cards>
    </main>
  );
}
