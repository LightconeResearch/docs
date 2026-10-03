import Link from 'fumadocs-core/link';
import type { CSSProperties, ReactNode } from 'react';

// How the parts of the stack fit together: your project at the centre, with
// its ASTRA sidecar beside it, both inside the Lightcone CLI, which runs them
// and gives back a reproducible project. A small icon marks each place your
// agent works. Drawn twice, wide for the page and tall for a phone; each
// tool's name links to its section. Colours are the brand's, so the drawing
// follows the light and dark schemes.

const color = {
  agentSkills: 'var(--lc-color-slate-blue)',
  astra: 'var(--lc-color-antique-gold)',
  cli: 'var(--lc-color-blue-ink)',
};

// The top-level fields of `astra.yaml`, with the parts that matter nested.
const fields = ['inputs:', 'outputs:', '  recipe:', 'decisions:', '  options:', 'prior_insights:'];
// What `lc init` lays out, and what you add.
const files = ['data/', 'src/', 'pyproject.toml', 'uv.lock', 'myst.yml', 'index.md'];
const duties = [
  'sets up the project',
  'allocates compute',
  'runs each recipe in a sandbox',
  'records how each result was made',
  'tracks what’s out of date',
];

type Point = { x: number; y: number };
type Box = Point & { width: number; height: number };

type Layout = {
  id: string;
  width: number;
  height: number;
  size: { name: number; text: number; mono: number; header: number; icon: number };
  // The key to the agent icon, over one or more lines.
  key: Point & { lines: number; lineGap: number };
  // The CLI, drawn as the dashed line around everything it runs.
  cli: Box & { name: Point; gear: Point & { radius: number }; duties: Point; dutyGap: number };
  astra: Box & { rowGap: number };
  project: Box & { rowGap: number };
  sidecar: { y: number; label: Point };
  output: Box;
  arrow: [number, number][];
};

const wide: Layout = {
  id: 'wide',
  width: 760,
  height: 456,
  size: { name: 18, text: 13, mono: 13, header: 16, icon: 20 },
  key: { x: 16, y: 27, lines: 1, lineGap: 0 },
  cli: {
    x: 12,
    y: 48,
    width: 736,
    height: 282,
    name: { x: 536, y: 98 },
    gear: { x: 522, y: 92, radius: 10 },
    duties: { x: 516, y: 132 },
    dutyGap: 22,
  },
  astra: { x: 28, y: 92, width: 176, height: 192, rowGap: 18 },
  project: { x: 276, y: 70, width: 200, height: 236, rowGap: 28 },
  sidecar: { y: 188, label: { x: 240, y: 180 } },
  output: { x: 136, y: 370, width: 480, height: 68 },
  arrow: [[376, 308], [376, 367]],
};

const narrow: Layout = {
  id: 'narrow',
  width: 360,
  height: 516,
  size: { name: 15.5, text: 12, mono: 11.5, header: 14, icon: 17 },
  key: { x: 8, y: 20, lines: 2, lineGap: 16 },
  cli: {
    x: 6,
    y: 52,
    width: 348,
    height: 342,
    name: { x: 44, y: 82 },
    gear: { x: 30, y: 77, radius: 9 },
    duties: { x: 24, y: 106 },
    dutyGap: 16,
  },
  astra: { x: 18, y: 192, width: 122, height: 170, rowGap: 17 },
  project: { x: 196, y: 178, width: 146, height: 198, rowGap: 22 },
  sidecar: { y: 277, label: { x: 168, y: 269 } },
  output: { x: 18, y: 422, width: 324, height: 82 },
  arrow: [[269, 378], [269, 419]],
};

// The path through a connector's points, rounding each corner slightly.
function route(points: [number, number][], radius = 6) {
  const [first, ...rest] = points;
  let d = `M${first[0]},${first[1]}`;
  rest.forEach(([x, y], i) => {
    const next = rest[i + 1];
    if (!next) {
      d += ` L${x},${y}`;
      return;
    }
    const [px, py] = points[i];
    const inX = Math.sign(x - px);
    const inY = Math.sign(y - py);
    const outX = Math.sign(next[0] - x);
    const outY = Math.sign(next[1] - y);
    d += ` L${x - inX * radius},${y - inY * radius} Q${x},${y} ${x + outX * radius},${y + outY * radius}`;
  });
  return d;
}

// A gear with eight teeth and a hole at its centre, filled even-odd.
function gearPath({ x, y, radius }: Point & { radius: number }) {
  const teeth = 8;
  const inner = radius * 0.74;
  const hole = radius * 0.32;
  const step = (2 * Math.PI) / teeth;
  const at = (r: number, a: number) =>
    `${(x + r * Math.cos(a)).toFixed(2)},${(y + r * Math.sin(a)).toFixed(2)}`;
  const outline = Array.from({ length: teeth }, (_, k) => {
    const a = k * step;
    return [
      at(inner, a - step * 0.3),
      at(radius, a - step * 0.18),
      at(radius, a + step * 0.18),
      at(inner, a + step * 0.3),
    ].join(' L');
  }).join(' L');
  return `M${outline} Z M${x + hole},${y} A${hole},${hole} 0 1,0 ${x - hole},${y} A${hole},${hole} 0 1,0 ${x + hole},${y} Z`;
}

const font = {
  name: 'var(--lc-font-heading)',
  text: 'var(--lc-font-body)',
  mono: 'var(--lc-font-mono)',
};
const muted = 'var(--color-fd-muted-foreground)';
const foreground = 'var(--color-fd-foreground)';
const border = 'var(--color-fd-border)';
const linkClass =
  'outline-none [&_.name]:decoration-1 [&_.name]:underline-offset-4 hover:[&_.name]:underline focus-visible:[&_.name]:underline';

// Lucide's bot, the mark for your agent, with its top-left corner at x, y.
function AgentIcon({ x, y, size }: Point & { size: number }) {
  return (
    <Link href="/agent-skills" aria-label="Your agent, taught by Agent Skills" className="outline-none">
      <rect x={x - 3} y={y - 3} width={size + 6} height={size + 6} fill="transparent" />
      <g
        transform={`translate(${x} ${y}) scale(${size / 24})`}
        fill="none"
        stroke={color.agentSkills}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2 M20 14h2 M15 13v2 M9 13v2" />
      </g>
    </Link>
  );
}

function Diagram({ layout, className }: { layout: Layout; className: string }) {
  const { size, key, cli, astra, project, sidecar, output } = layout;
  const head = `stack-${layout.id}-head`;
  const icon = size.icon;
  const text: CSSProperties = { fontFamily: font.text, fontSize: size.text, fill: muted };
  const mono: CSSProperties = { fontFamily: font.mono, fontSize: size.mono, fill: foreground };
  const header = (fill: string): CSSProperties => ({ fontFamily: font.name, fontSize: size.header, fill });
  const box = (b: Box, tint?: string) => (
    <rect
      x={b.x}
      y={b.y}
      width={b.width}
      height={b.height}
      rx={8}
      style={{
        fill: tint
          ? `color-mix(in srgb, ${tint} 8%, var(--color-fd-background))`
          : 'var(--color-fd-background)',
        stroke: border,
      }}
    />
  );
  // A box's heading, with the rule under it; returns the heading's baseline.
  const heading = (b: Box) => b.y + size.header + 12;
  const rule = (b: Box, y: number) => (
    <line x1={b.x} x2={b.x + b.width} y1={y} y2={y} style={{ stroke: border }} />
  );
  const agentLink = (
    <Link href="/agent-skills" className={linkClass}>
      <tspan className="name" style={{ fontFamily: font.name, fill: color.agentSkills }}>
        Agent Skills
      </tspan>
    </Link>
  );

  const astraTop = heading(astra);
  const projectTop = heading(project);

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={className}
      style={{ color: muted, fontVariantCaps: 'normal' }}
      role="group"
      aria-labelledby={`stack-${layout.id}-title`}
    >
      <title id={`stack-${layout.id}-title`}>How the parts of the Lightcone Stack fit together</title>
      <defs>
        <marker
          id={head}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M1,1 L9,5 L1,9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* The key: where the icon appears, your agent is at work. */}
      <AgentIcon x={key.x} y={key.y - icon + 2} size={icon} />
      <text x={key.x + icon + 8} y={key.y} style={text}>
        {key.lines === 1 ? (
          <>
            Your agent, taught by {agentLink}, maintains the ASTRA sidecar, builds the project and
            runs the CLI.
          </>
        ) : (
          <>
            <tspan>Your agent, taught by </tspan>
            {agentLink}
            <tspan>, maintains</tspan>
            <tspan x={key.x} dy={key.lineGap}>
              the ASTRA sidecar, builds the project and runs the CLI.
            </tspan>
          </>
        )}
      </text>

      {/* The Lightcone CLI, around everything it runs. */}
      <rect
        x={cli.x}
        y={cli.y}
        width={cli.width}
        height={cli.height}
        rx={14}
        fill="none"
        stroke={color.cli}
        strokeOpacity={0.6}
        strokeDasharray="5 5"
      />
      <Link href="/lightcone-cli" aria-label="Lightcone CLI" className={linkClass}>
        <path d={gearPath(cli.gear)} fillRule="evenodd" style={{ fill: color.cli }} />
        <text
          className="name"
          x={cli.name.x}
          y={cli.name.y}
          style={{ fontFamily: font.name, fontSize: size.name, fill: color.cli }}
        >
          Lightcone CLI
        </text>
      </Link>
      <AgentIcon x={cli.name.x + size.name * 6.4} y={cli.name.y - icon + 2} size={icon} />
      {duties.map((duty, i) => (
        <text key={duty} x={cli.duties.x} y={cli.duties.y + i * cli.dutyGap} style={text}>
          <tspan style={{ fill: color.cli }}>•</tspan>
          <tspan dx={6}>{duty}</tspan>
        </text>
      ))}

      {/* The sidecar: what the analysis is, beside the project that does it. */}
      {box(astra)}
      <Link href="/astra" aria-label="ASTRA" className={linkClass}>
        <text className="name" x={astra.x + 16} y={astraTop} style={header(color.astra)}>
          ASTRA
        </text>
      </Link>
      <AgentIcon x={astra.x + astra.width - icon - 12} y={astraTop - icon + 2} size={icon} />
      <text x={astra.x + 16} y={astraTop + size.mono + 8} style={{ ...mono, fill: muted }}>
        astra.yaml
      </text>
      {rule(astra, astraTop + size.mono + 20)}
      {fields.map((field, i) => (
        <text
          key={field}
          x={astra.x + 16}
          y={astraTop + size.mono + 20 + (i + 1) * astra.rowGap + 4}
          style={mono}
          xmlSpace="preserve"
        >
          {field}
        </text>
      ))}

      <path
        d={route([
          [astra.x + astra.width, sidecar.y],
          [project.x - 3, sidecar.y],
        ])}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.7}
        strokeWidth={1.25}
        markerEnd={`url(#${head})`}
      />
      <text
        x={sidecar.label.x}
        y={sidecar.label.y}
        textAnchor="middle"
        style={{ ...text, fontStyle: 'italic' }}
      >
        describes
      </text>

      {box(project)}
      <text x={project.x + 16} y={projectTop} style={header(foreground)}>
        Your project
      </text>
      <AgentIcon x={project.x + project.width - icon - 12} y={projectTop - icon + 2} size={icon} />
      {rule(project, projectTop + 12)}
      {files.map((file, i) => (
        <text key={file} x={project.x + 16} y={projectTop + 12 + (i + 1) * project.rowGap} style={mono}>
          {file}
        </text>
      ))}

      {/* What comes out: the project, complete and reproducible. */}
      <path
        d={route(layout.arrow)}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.7}
        strokeWidth={1.25}
        markerEnd={`url(#${head})`}
      />
      {box(output, color.astra)}
      <text x={output.x + 20} y={output.y + size.header + 12} style={header(foreground)}>
        Your reproducible project
      </text>
      <text x={output.x + 20} y={output.y + size.header + 12 + size.text + 12} style={text}>
        {layout.id === 'wide' ? (
          'spec, code, data, results and provenance, in one git repository'
        ) : (
          <>
            <tspan>spec, code, data, results and provenance,</tspan>
            <tspan x={output.x + 20} dy={size.text + 4}>
              in one git repository
            </tspan>
          </>
        )}
      </text>
    </svg>
  );
}

export function StackDiagram() {
  return (
    <figure className="not-prose @container my-8">
      <Diagram layout={wide} className="mx-auto hidden w-full max-w-[760px] @min-[34rem]:block" />
      <Diagram layout={narrow} className="mx-auto block w-full max-w-[420px] @min-[34rem]:hidden" />
      <figcaption className="mt-4 text-sm text-fd-muted-foreground">
        Select a tool to read more about it.
      </figcaption>
    </figure>
  );
}
