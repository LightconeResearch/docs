import type { CSSProperties } from 'react';
import Link from 'fumadocs-core/link';
import { CalloutContainer, CalloutDescription, CalloutTitle } from 'fumadocs-ui/components/callout';

// The layers of the stack, drawn with the brand's colours so the diagram
// follows the light and dark schemes. ASTRA is the foundation the others
// read from and write to.
const layers = [
  {
    name: 'Agent Skills',
    role: 'Work with your agent',
    text: 'Teach Claude Code or Codex to plan the analysis with you and run it.',
    href: '/agent-skills',
    color: 'var(--lc-color-slate-blue)',
  },
  {
    name: 'Lightcone Lab',
    role: 'Explore',
    text: "A JupyterLab workbench that shows the project's outputs and how each one was made.",
    href: '/lightcone-lab',
    color: 'var(--lc-color-vert-de-gris)',
  },
  {
    name: 'MySTRA',
    role: 'Communicate',
    text: 'Write the report in MyST and cite results by their path, so a rebuild picks up the latest ones.',
    href: '/mystra',
    color: 'var(--lc-color-wax-red)',
  },
  {
    name: 'Lightcone CLI',
    role: 'Execute',
    text: 'Runs each recipe in a sandbox and commits its outputs with their provenance.',
    href: '/lightcone-cli',
    color: 'var(--lc-color-blue-ink)',
  },
  {
    name: 'ASTRA',
    role: 'Describe',
    text: 'Describes the analysis in astra.yaml: its inputs and outputs, and each decision with its evidence.',
    href: '/astra',
    color: 'var(--lc-color-antique-gold)',
  },
];

export function StackLayers() {
  return (
    <figure className="not-prose my-6">
      <div className="flex flex-col gap-2">
        {layers.map((layer) => (
          <Link key={layer.name} href={layer.href} className="block rounded-xl">
            <CalloutContainer
              icon={false}
              className="my-0 transition-colors hover:bg-fd-accent/80"
              style={{ '--callout-color': layer.color } as CSSProperties}
            >
              <div className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[9rem_1fr]">
                <CalloutTitle>
                  {layer.name}
                  <span className="block text-xs font-normal text-fd-muted-foreground">{layer.role}</span>
                </CalloutTitle>
                <CalloutDescription>{layer.text}</CalloutDescription>
              </div>
            </CalloutContainer>
          </Link>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-fd-muted-foreground">
        The tools above all work from the same ASTRA specification, <code>astra.yaml</code>.
      </figcaption>
    </figure>
  );
}
