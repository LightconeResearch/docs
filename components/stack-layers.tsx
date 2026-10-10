import type { CSSProperties } from 'react';
import Link from 'fumadocs-core/link';
import { CalloutContainer, CalloutDescription, CalloutTitle } from 'fumadocs-ui/components/callout';
import { Bot, FlaskConical, PenLine, ScrollText, Terminal } from 'lucide-react';

// The layers of the stack, drawn with the brand's colours so the diagram
// follows the light and dark schemes. ASTRA is the foundation the others
// read from and write to. Each layer has the icon of its docs, for the
// landing page's navbar and cards.
export const layers = [
  {
    name: 'Agent Skills',
    icon: Bot,
    role: 'Work with your agent',
    text: 'Teach Claude Code or Codex to scope, build, run and report on the analysis with you.',
    href: '/docs/agent-skills',
    color: 'var(--lc-color-slate-blue)',
  },
  {
    name: 'Lightcone Lab',
    icon: FlaskConical,
    role: 'Explore',
    text: 'A JupyterLab workbench for the project: its inventory, pipeline, provenance and report.',
    href: '/docs/lightcone-lab',
    color: 'var(--lc-color-vert-de-gris)',
  },
  {
    name: 'MySTRA',
    icon: PenLine,
    role: 'Communicate',
    text: 'A report that references the analysis by path, so it stays in step with it.',
    href: '/docs/mystra',
    color: 'var(--lc-color-wax-red)',
  },
  {
    name: 'Lightcone CLI',
    icon: Terminal,
    role: 'Execute',
    text: 'Runs every recipe in a sandbox and records the provenance of every output.',
    href: '/docs/lightcone-cli',
    color: 'var(--lc-color-blue-ink)',
  },
  {
    name: 'ASTRA',
    icon: ScrollText,
    role: 'Describe',
    text: 'The specification: the inputs, outputs, decisions and evidence of the analysis, in astra.yaml.',
    href: '/docs/astra',
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
        Everything builds on ASTRA: the layers above read from and write to the analysis&apos;s
        single source of truth.
      </figcaption>
    </figure>
  );
}
