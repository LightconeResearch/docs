import Link from 'fumadocs-core/link';
import { Laptop, Server } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

// How lc reaches compute, drawn like the stack diagram: the commands that
// execute the analysis, the lc compute layer that allocates for them, and the
// providers that ~/.lightcone/compute.yaml lists. Brand colours follow the
// light and dark schemes.
const providers = [
  { name: 'Your machine', provider: 'local', href: '#on-your-machine', icon: Laptop },
  { name: 'Slurm cluster', provider: 'slurm', href: '#slurm', icon: Server },
];

function tint(color: string): CSSProperties {
  return {
    background: `color-mix(in srgb, ${color} 14%, var(--color-fd-card))`,
    borderColor: `color-mix(in srgb, ${color} 45%, var(--color-fd-border))`,
  };
}

// One layer, with its note to the right on wide screens and below it on narrow ones.
function Layer({ note, children }: { note: ReactNode; children: ReactNode }) {
  return (
    <div className="grid items-center gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,1fr)_15rem]">
      {children}
      <p className="flex items-center gap-2 text-sm text-fd-muted-foreground">
        <span
          aria-hidden
          className="hidden w-6 shrink-0 border-t-2 border-dotted border-fd-muted-foreground/40 sm:block"
        />
        <span>{note}</span>
      </p>
    </div>
  );
}

const box =
  'whitespace-nowrap rounded-lg border px-2 py-3 text-center text-sm text-fd-foreground transition-shadow hover:shadow-md sm:px-4 sm:text-base';

export function ComputeLayers() {
  return (
    <figure aria-label="How lc reaches compute" className="not-prose my-6 flex flex-col gap-2">
      <Layer note="Execute your analysis">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/docs/lightcone-cli/commands/run" className={box} style={tint('var(--lc-color-vert-de-gris)')}>
            <code>lc run</code>
          </Link>
          <Link
            href="/docs/lightcone-cli/commands/materialize"
            className={box}
            style={tint('var(--lc-color-vert-de-gris)')}
          >
            <code>lc materialize</code>
          </Link>
        </div>
      </Layer>
      <Layer note="Allocate and stop compute">
        <Link href="/docs/lightcone-cli/commands/compute" className={box} style={tint('var(--lc-color-antique-gold)')}>
          <code>lc compute</code>
        </Link>
      </Layer>
      <Layer
        note={
          <>
            Configured in <code>compute.yaml</code>
          </>
        }
      >
        <div className="rounded-lg border bg-fd-card p-3">
          <p className="mb-2 text-center text-sm font-medium text-fd-foreground">Compute providers</p>
          <div className="grid grid-cols-2 gap-2">
            {providers.map(({ name, provider, href, icon: Icon }) => (
              <Link
                key={provider}
                href={href}
                className="flex flex-col items-center gap-1 rounded-md border bg-fd-background px-3 py-3 text-center transition-shadow hover:shadow-md"
              >
                <Icon aria-hidden className="size-6 text-fd-muted-foreground" />
                <span className="text-sm font-medium text-fd-foreground">{name}</span>
                <code className="text-xs text-fd-muted-foreground">provider: {provider}</code>
              </Link>
            ))}
          </div>
        </div>
      </Layer>
    </figure>
  );
}
