import Link from 'fumadocs-core/link';

// The layers of the stack, drawn with the brand's colours so the diagram
// follows the light and dark schemes. ASTRA is the foundation the others
// read from and write to.
const layers = [
  {
    name: 'Agent Skills',
    role: 'Work with your agent',
    text: 'Teach Claude Code or Codex to scope, build, run and report on the analysis with you.',
    href: '/agent-skills',
    color: 'var(--lc-color-slate-blue)',
  },
  {
    name: 'Lightcone Lab',
    role: 'Explore',
    text: 'A JupyterLab workbench for the project: its inventory, pipeline, provenance and report.',
    href: '/lightcone-lab',
    color: 'var(--lc-color-vert-de-gris)',
  },
  {
    name: 'MySTRA',
    role: 'Communicate',
    text: 'A report that references the analysis by path, so it stays in step with it.',
    href: '/mystra',
    color: 'var(--lc-color-wax-red)',
  },
  {
    name: 'Lightcone CLI',
    role: 'Execute',
    text: 'Runs every recipe in a sandbox and records the provenance of every output.',
    href: '/lightcone-cli',
    color: 'var(--lc-color-blue-ink)',
  },
  {
    name: 'ASTRA',
    role: 'Describe',
    text: 'The specification: the inputs, outputs, decisions and evidence of the analysis, in astra.yaml.',
    href: '/astra',
    color: 'var(--lc-color-antique-gold)',
    base: true,
  },
];

export function StackLayers() {
  return (
    <figure className="not-prose my-6">
      <div className="flex flex-col gap-2">
        {layers.map((layer) => (
          <Link
            key={layer.name}
            href={layer.href}
            className="grid gap-x-4 gap-y-0.5 rounded-lg border border-l-[3px] bg-fd-card px-4 py-3 transition-colors hover:bg-fd-accent sm:grid-cols-[9rem_1fr]"
            style={{
              borderLeftColor: layer.color,
              background: layer.base
                ? `color-mix(in srgb, ${layer.color} 10%, var(--color-fd-card))`
                : undefined,
            }}
          >
            <span className="font-medium text-fd-foreground">
              {layer.name}
              <span className="block text-xs text-fd-muted-foreground">{layer.role}</span>
            </span>
            <span className="text-sm text-fd-muted-foreground">{layer.text}</span>
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
