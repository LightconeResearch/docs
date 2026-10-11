import Link from 'fumadocs-core/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { Bot, Laptop } from 'lucide-react';
import type { ReactNode } from 'react';
import './stack-diagram.css';

// The OSPO talk's "The same project runs anywhere" slide, drawn like the stack
// diagram: the agent drives the same lc commands everywhere, the CLI runs that
// work on a Dask cluster, and each provider starts the cluster on its own
// hardware. Kubernetes is drawn as planned until the CLI has a provider for it.
function Title({ logo, name, href }: { logo: ReactNode; name: string; href?: string }) {
  const content = (
    <>
      {logo}
      {name}
    </>
  );
  return href ? (
    <Link href={href} className="inline-flex flex-wrap items-center gap-2 hover:underline">
      {content}
    </Link>
  ) : (
    <span className="inline-flex flex-wrap items-center gap-2">{content}</span>
  );
}

function Edge({ label }: { label: string }) {
  return (
    <div className="sd-edge h-12" aria-hidden="true">
      <span className="sd-edge__line" />
      <span className="sd-edge__label">{label}</span>
    </div>
  );
}

export function ComputeBackends() {
  return (
    <figure
      className="not-prose my-8"
      aria-label="Your agent drives the Lightcone CLI, which starts a Dask cluster and runs the work on it. The cluster runs on your laptop or workstation, or as Slurm jobs on an HPC cluster. A Kubernetes provider is planned."
    >
      <Card title={<Title logo={<Bot aria-hidden className="size-5" />} name="Your agent" />}>
        Starts a cluster with <code>lc compute launch</code>, then sends it work with <code>lc run</code> and{' '}
        <code>lc materialize</code>. The commands are the same on every machine.
      </Card>

      <Edge label="Drives the CLI" />

      <Card
        title={
          <Title
            logo={<img src="/logos/lightcone-mark.svg" alt="" className="size-6 dark:invert" />}
            name="Lightcone CLI"
            href="/lightcone-cli/commands/compute"
          />
        }
      >
        <div className="flex items-start gap-3">
          <img src="/logos/dask.svg" alt="Dask" className="mt-0.5 size-6 shrink-0" />
          <p>
            <strong className="block text-fd-foreground">One execution interface</strong>
            Starts a Dask cluster from an offer in <code>~/.lightcone/compute.yaml</code>, and runs each
            task on it, wherever the cluster is.
          </p>
        </div>
      </Card>

      <Edge label="Starts the cluster on" />

      <Cards className="grid-cols-3">
        <Card
          title={
            <Title
              logo={<Laptop aria-hidden className="size-5" />}
              name="Your machine"
              href="/lightcone-cli/configuring-compute#on-your-machine"
            />
          }
        >
          A laptop or workstation, with no configuration.
          <code className="mt-1 block">provider: local</code>
        </Card>
        <Card
          title={
            <Title
              logo={<img src="/logos/slurm.png" alt="" className="h-4 w-auto" />}
              name="HPC cluster"
              href="/lightcone-cli/configuring-compute#slurm"
            />
          }
        >
          Slurm jobs, submitted for you, with no batch scripts.
          <code className="mt-1 block">provider: slurm</code>
        </Card>
        <Card
          className="border-dashed"
          title={<Title logo={<img src="/logos/kubernetes.svg" alt="" className="size-5" />} name="Kubernetes" />}
        >
          Cloud and JupyterHub deployments.
          <span className="mt-1 block italic">Planned</span>
        </Card>
      </Cards>
    </figure>
  );
}
