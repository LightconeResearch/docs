import type { CSSProperties, ReactNode } from 'react';
import type { Metadata } from 'next';
import Link from 'fumadocs-core/link';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { ArrowRight, Bot, FileText, FlaskConical, GitCommitHorizontal, Layers, PenLine, Terminal } from 'lucide-react';
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

const steps = [
  {
    icon: FileText,
    title: 'Describe',
    text: 'Before anything runs, your agent interviews you and writes the analysis down in astra.yaml: its inputs, outputs, methodological choices and the evidence behind them.',
  },
  {
    icon: Terminal,
    title: 'Run',
    text: 'The Lightcone CLI runs each recipe in a sandbox, on your machine or a Slurm cluster, and commits every output next to a record of the code, data and environment that made it.',
  },
  {
    icon: GitCommitHorizontal,
    title: 'Trace',
    text: 'You and your collaborators can follow any result back to the work that produced it, review the reasoning and rerun the analysis, long after the agent’s session has ended.',
  },
];

const icons: Record<string, typeof Bot> = {
  'Agent Skills': Bot,
  'Lightcone Lab': FlaskConical,
  MySTRA: PenLine,
  'Lightcone CLI': Terminal,
  ASTRA: Layers,
};

const principles = [
  {
    title: 'It starts with questions, not code.',
    text: 'The agent writes the analysis down in the specification, where you can read it, before anything runs.',
  },
  {
    title: 'It never writes a result itself.',
    text: 'The agent describes the analysis and drives the CLI; every output comes out of lc, with its provenance.',
  },
  {
    title: 'You own the argument.',
    text: 'You make the scientific choices and remain responsible for what the results mean. The record makes them visible.',
  },
];

const primaryButton =
  'inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90';
const secondaryButton =
  'inline-flex items-center gap-2 rounded-full border bg-fd-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent';

function SectionHeading({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm tracking-wide text-(--lc-color-slate-blue)">{kicker}</p>
      <h2 className="text-3xl text-(--lc-color-antique-gold) md:text-4xl">{title}</h2>
      {children && <p className="mt-4 font-(family-name:--lc-font-body) text-lg normal-case text-fd-muted-foreground [font-variant-caps:normal]">{children}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      {/* Hero */}
      <section className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Link
            href="https://github.com/LightconeResearch/lightcone-cli/issues"
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
          >
            <span className="size-1.5 rounded-full bg-(--lc-color-vert-de-gris)" />
            Public beta: tell us what to build next
          </Link>
          <h1 className="text-4xl leading-tight md:text-6xl">Rigorous research, without the bookkeeping.</h1>
          <p className="mt-6 max-w-xl font-(family-name:--lc-font-body) text-lg text-fd-muted-foreground [font-variant-caps:normal] md:text-xl">
            The Lightcone Stack makes it easier to do research with an AI agent, from planning an analysis to running it
            and writing up the results. It works with agents such as Claude Code and Codex, using your own code, data and
            compute.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/docs/quickstart" className={primaryButton}>
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/docs" className={secondaryButton}>
              Read the documentation
            </Link>
          </div>
        </div>
        <figure className="min-w-0 rounded-2xl border bg-fd-card p-2 shadow-sm">
          <ServerCodeBlock code={astraYaml} lang="yaml" codeblock={{ title: 'astra.yaml', className: 'my-0' }} />
          <figcaption className="px-3 pt-3 pb-1 text-sm text-fd-muted-foreground">
            The analysis as structured data: each output, the recipe that makes it, and the decisions it depends on.
          </figcaption>
        </figure>
      </section>

      {/* How it works */}
      <section className="border-t py-16 md:py-20">
        <SectionHeading kicker="How it works" title="One record, from plan to result">
          Your agent writes down the methods, choices and evidence as you work. When the analysis runs, Lightcone records
          the code, data and environment behind each result.
        </SectionHeading>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl border bg-fd-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-fd-accent text-fd-accent-foreground">
                  <step.icon className="size-4.5" />
                </span>
                <span className="text-sm text-fd-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mb-2 text-xl">{step.title}</h3>
              <p className="font-(family-name:--lc-font-body) text-fd-muted-foreground [font-variant-caps:normal]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* The stack */}
      <section className="border-t py-16 md:py-20">
        <SectionHeading kicker="The stack" title="Separate tools, one repository">
          Each tool reads the same astra.yaml and the same record, and shares nothing else. Start with your agent and the
          CLI; add the rest later, or not at all.
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer) => {
            const Icon = icons[layer.name] ?? Layers;
            return (
              <Link
                key={layer.name}
                href={layer.href}
                className={`group flex flex-col rounded-2xl border border-t-4 border-t-(--layer-color) bg-fd-card p-6 transition-colors hover:bg-fd-accent/60 ${
                  // ASTRA, the foundation the other tools read, fills the last row.
                  layer.name === 'ASTRA' ? 'sm:col-span-2' : ''
                }`}
                style={{ '--layer-color': layer.color } as CSSProperties}
              >
                <div className="mb-3 flex items-center gap-3">
                  <Icon className="size-5 text-(--layer-color)" />
                  <h3 className="text-lg">{layer.name}</h3>
                  <span className="ms-auto text-xs text-fd-muted-foreground">{layer.role}</span>
                </div>
                <p className="flex-1 font-(family-name:--lc-font-body) text-fd-muted-foreground [font-variant-caps:normal]">{layer.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-(--lc-color-slate-blue)">
                  Read more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* You and your agent */}
      <section className="border-t py-16 md:py-20">
        <SectionHeading kicker="You and your agent" title="The agent does the work, not the judgment" />
        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="border-s-2 border-(--lc-color-antique-gold) ps-5">
              <h3 className="mb-2 text-lg">{p.title}</h3>
              <p className="font-(family-name:--lc-font-body) text-fd-muted-foreground [font-variant-caps:normal]">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="mb-16 rounded-3xl border bg-fd-card px-6 py-12 text-center md:py-16">
        <h2 className="text-3xl text-(--lc-color-antique-gold) md:text-4xl">Start your first analysis</h2>
        <p className="mx-auto mt-4 max-w-xl font-(family-name:--lc-font-body) text-lg text-fd-muted-foreground [font-variant-caps:normal]">
          Add the Lightcone plugin to Claude Code or Codex, and scope an analysis together in a few minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/docs/quickstart" className={primaryButton}>
            Quick Start
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/docs/guides/first-analysis" className={secondaryButton}>
            Your first analysis
          </Link>
        </div>
      </section>
    </div>
  );
}
