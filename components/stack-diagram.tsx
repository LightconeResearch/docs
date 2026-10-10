import Link from 'fumadocs-core/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import { Bot, FolderTree } from 'lucide-react';
import type { ReactNode } from 'react';
import './stack-diagram.css';

const astraYaml = `decisions:
  noise_model:
    rationale: sets the error budget
    options:
      gaussian: {insights: [gaussian_noise]}
      heavy_tailed: {excluded: true}
outputs:
  - id: fit_results
    decisions: [noise_model]
    recipe:
      command: python src/fit.py {decisions.noise_model}`;

// The OSPO talk's inline reference and output embed, using this project's IDs.
const mystDocument = 'Using {astra}`decisions.noise_model`,\n'
  + 'we obtain the following fit.\n\n'
  + ':::{astra} outputs.fit_results\n:::';

function Title({ logo, name, href }: { logo?: ReactNode; name: string; href: string }) {
  return (
    <Link href={href} className="inline-flex flex-wrap items-center gap-2 hover:underline">
      {logo}
      {name}
    </Link>
  );
}

function Tool({ logos, title, children }: { logos: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-t pt-3">
      <span className="flex w-12 shrink-0 flex-wrap items-center justify-center gap-1">{logos}</span>
      <p>
        <strong className="block text-fd-foreground">{title}</strong>
        {children}
      </p>
    </div>
  );
}

export function StackDiagram() {
  return (
    <figure
      className="not-prose my-8 @container"
      aria-label="The agent drives the Lightcone CLI, which reads the project, runs recipes on compute, and records results back in the project."
    >
      <div className="sd-flow">
        <div className="min-w-0 [grid-area:agent]">
          <Card
            title={<Title logo={<Bot aria-hidden className="size-5" />} name="You and your agent" href="/agent-skills" />}
          >
            Agent Skills teach Claude Code or Codex to write the specification with you and run it.
          </Card>
        </div>

        <div className="sd-edge sd-edge--agent" aria-hidden="true">
          <span className="sd-edge__line" />
          <span className="sd-edge__label">Drives the CLI</span>
        </div>

        <div className="min-w-0 [grid-area:cli]">
          <Card
            title={<Title logo={<img src="/logos/lightcone-mark.svg" alt="" className="size-6 dark:invert" />} name="Lightcone CLI" href="/lightcone-cli" />}
          >
            <div className="flex flex-col gap-3">
              <p>
                Runs each recipe from the specification in a sandbox, and commits the result with{' '}
                <strong>certified provenance</strong>: the code, inputs and environment that produced it.
              </p>
              <Tool
                title="Code and artifact versioning"
                logos={
                  <>
                    <img src="/logos/git.svg" alt="git" className="size-6" />
                    <img src="/logos/git-annex.svg" alt="git-annex" className="size-6" />
                  </>
                }
              >
                git holds the code and the specification. git-annex holds the data and results, each
                output with a content-addressed run record.
              </Tool>
              <Tool
                title="Reusable environment"
                logos={
                  <>
                    <img src="/logos/uv.svg" alt="uv" className="size-5" />
                    <img src="/logos/docker.svg" alt="Docker" className="h-6 w-auto" />
                  </>
                }
              >
                A uv lockfile, which you can wrap in a container image. The CLI hashes it into each
                output&apos;s record.
              </Tool>
            </div>
          </Card>
        </div>

        <div className="sd-edge sd-edge--compute" aria-hidden="true">
          <span className="sd-edge__line" />
          <span className="sd-edge__label">Runs recipes</span>
        </div>

        <div className="min-w-0 self-center [grid-area:compute]">
          <Card title={<Title name="Compute" href="/lightcone-cli/configuring-compute" />}>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2">
                <img src="/logos/kubernetes.svg" alt="Kubernetes" className="size-6" />
                <img src="/logos/dask.svg" alt="Dask" className="size-6" />
                <img src="/logos/slurm.png" alt="Slurm" className="h-4 w-auto" />
              </span>
              <p>
                <strong className="block text-fd-foreground">From a laptop to a cluster</strong>
                Run recipes on your laptop or on a Dask, Kubernetes or Slurm cluster, with the same run record.
              </p>
            </div>
          </Card>
        </div>

        <div className="sd-edge sd-edge--project" aria-hidden="true">
          <span className="sd-edge__line" />
          <span className="sd-edge__label"><span>Reads the spec</span><span>Records results</span></span>
        </div>

        <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-dashed p-4 [grid-area:project]">
          <p className="flex flex-wrap items-center gap-2 text-sm text-fd-muted-foreground">
            <FolderTree aria-hidden className="size-4" />
            Your project <span>· one git repository</span>
          </p>
          <Card
            title={<Title logo={<img src="/logos/astra.svg" alt="" className="size-6 dark:invert" />} name="astra.yaml" href="/astra" />}
          >
            <div className="sd-split">
              <ServerCodeBlock code={astraYaml} lang="yaml" codeblock={{ keepBackground: true }} />
              <p>
                The analysis as structured data: <strong>insights</strong> from the literature, <strong>decisions</strong> with their{' '}
                <strong>rationale</strong> and the options not taken, <strong>recipes</strong> that make each <strong>output</strong>, and the{' '}
                <strong>findings</strong> the outputs support.
              </p>
            </div>
          </Card>
          <Card
            title={<Title logo={<img src="/logos/myst-logo.svg" alt="" className="h-5 w-auto dark:brightness-150" />} name="index.md" href="/mystra" />}
          >
            <div className="sd-split">
              <ServerCodeBlock code={mystDocument} lang="md" codeblock={{ keepBackground: true }} />
              <p>
                Your write-up in MyST. You link <strong>decisions</strong> to their record and embed{' '}
                <strong>results</strong> from the project, and MySTRA resolves both when you build the document.
              </p>
            </div>
          </Card>
          <Cards className="grid-cols-3">
            <Card title={<code>src/</code>}>Your code, in git. A recipe names the command that runs it.</Card>
            <Card title={<code>data/</code>}>Input data, carried by git-annex.</Card>
            <Card title={<code>results/</code>}>
              Your results, each with a manifest and run record.
            </Card>
          </Cards>
        </div>
      </div>
    </figure>
  );
}
