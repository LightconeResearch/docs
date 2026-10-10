import type { CSSProperties, ReactNode } from 'react';
import './astra-graph.css';

// A slice of the GD-1 reproduction's ASTRA record as a dependency graph, after
// the ASTRA slide of the London talk: one node per element type, decisions with
// their options, outputs with the recipe that makes them. Nodes are placed on a
// 900 × 400 canvas, in percentages, and the edges are an SVG on the same
// coordinates, so the graph scales with the column.
const W = 900;
const H = 400;
const NODE = 186;

type Kind = 'insight' | 'input' | 'decision' | 'output' | 'finding';

function Node({ kind, type, x, y, h, children }: { kind: Kind; type: string; x: number; y: number; h: number; children: ReactNode }) {
  const glyph = { insight: '◈', input: '▤', decision: '◇', output: '◆', finding: '●' }[kind];
  const style = {
    left: `${(x / W) * 100}%`,
    top: `${(y / H) * 100}%`,
    width: `${(NODE / W) * 100}%`,
    height: `${(h / H) * 100}%`,
  } as CSSProperties;
  return (
    <div className={`ag-node ag-node--${kind}`} style={style}>
      <p className="ag-type">
        <span aria-hidden="true">{glyph}</span>
        {type}
      </p>
      {children}
    </div>
  );
}

function Recipe({ lines }: { lines: [string, string, string] }) {
  return (
    <code className="ag-recipe">
      <span className="ag-recipe__cmd">{lines[0]}</span>
      <span>{lines[1]}</span>
      <span className="ag-recipe__ref">{lines[2]}</span>
    </code>
  );
}

function Edge({ d, kind = 'flow' }: { d: string; kind?: 'flow' | 'decision' | 'insight' | 'finding' }) {
  return <path className={`ag-edge ag-edge--${kind}`} d={d} markerEnd={`url(#ag-arrow-${kind})`} />;
}

export function AstraGraph() {
  return (
    <figure
      className="not-prose my-6"
      aria-label="A slice of an ASTRA record. Two inputs feed an orbit fit, which feeds particle-spray toy streams, which feed Figure 2. The Milky Way potential decision parameterizes the orbit fit, and a prior insight from Bovy 2015 backs one of its options. The progenitor mass decision parameterizes the toy streams. Figure 2 is the evidence for a finding that GD-1 is clumpier than smooth-potential models predict."
    >
      <div className="ag-scroll">
        <div className="ag-sizer">
          <div className="ag-stage" aria-hidden="true">
            <svg className="ag-edges" viewBox={`0 0 ${W} ${H}`}>
              <defs>
                {(['flow', 'decision', 'insight', 'finding'] as const).map((kind) => (
                  <marker key={kind} id={`ag-arrow-${kind}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                    <path className={`ag-marker ag-marker--${kind}`} d="M0,0 L8,4 L0,8 z" />
                  </marker>
                ))}
              </defs>
              {/* Inputs feed the orbit fit, which feeds the toy streams, which feed Figure 2. */}
              <Edge d="M186,291 C212,291 210,314 236,314" />
              <Edge d="M186,365 C212,365 210,338 236,338" />
              <Edge d="M424,326 L474,326" />
              <Edge d="M662,316 C692,316 684,98 712,98" />
              {/* Decisions parameterize the outputs whose recipes use them. */}
              <Edge kind="decision" d="M331,152 L331,254" />
              <Edge kind="decision" d="M569,120 L569,254" />
              {/* A prior insight backs an option; Figure 2 evidences the finding. */}
              <Edge kind="insight" d="M186,70 C212,70 210,113 236,113" />
              <Edge kind="finding" d="M807,196 L807,254" />
              <text className="ag-rel" x="190" y="52">informs</text>
              <text className="ag-rel" x="338" y="206">parameterizes</text>
              <text className="ag-rel" x="576" y="190">parameterizes</text>
              <text className="ag-rel" x="433" y="317">feeds</text>
              <text className="ag-rel" x="814" y="228">evidences</text>
            </svg>

            <Node kind="insight" type="Prior insight" x={0} y={10} h={140}>
              <p className="ag-title">MWPotential2014: bulge, disk and NFW halo, 220&nbsp;km/s at the Sun</p>
              <p className="ag-meta">Bovy 2015 · DOI and exact quote</p>
            </Node>
            <Node kind="input" type="Input" x={0} y={256} h={70}>
              <p className="ag-title">Koposov et al. distances</p>
            </Node>
            <Node kind="input" type="Input" x={0} y={330} h={70}>
              <p className="ag-title">Koposov et al. radial velocities</p>
            </Node>

            <Node kind="decision" type="Decision" x={238} y={0} h={152}>
              <p className="ag-title">Milky Way potential</p>
              <ul className="ag-options">
                <li className="is-on">Paper 2018 potential</li>
                <li>Gala Milky Way v1</li>
                <li>
                  Gala Milky Way v2 <span className="ag-backed">◈</span>
                </li>
              </ul>
            </Node>
            <Node kind="decision" type="Decision" x={476} y={0} h={120}>
              <p className="ag-title">Progenitor mass</p>
              <ul className="ag-options">
                <li className="is-on">
                  10<sup>5</sup>&nbsp;M<sub>☉</sub>, losing mass
                </li>
                <li>
                  6 × 10<sup>4</sup>&nbsp;M<sub>☉</sub>
                </li>
              </ul>
            </Node>

            <Node kind="output" type="Output · data" x={238} y={256} h={140}>
              <p className="ag-title">Orbit fit</p>
              <Recipe lines={['python fit_orbit.py', '--potential', '{decisions.potential}']} />
            </Node>
            <Node kind="output" type="Output · data" x={476} y={256} h={140}>
              <p className="ag-title">Particle-spray toy streams</p>
              <Recipe lines={['python spray_stream.py', '--mass', '{decisions.progenitor_mass}']} />
            </Node>
            <Node kind="output" type="Output · figure" x={714} y={0} h={196}>
              <img className="ag-figure" src="/images/astra/gd1-figure2.jpg" alt="" />
              <p className="ag-title">Figure 2: data vs toy streams</p>
              <Recipe lines={['python plot_density.py', '--models', '{outputs.toy_streams}']} />
            </Node>
            <Node kind="finding" type="Finding" x={714} y={256} h={140}>
              <p className="ag-title">GD-1 is clumpier than smooth-potential models predict</p>
              <p className="ag-meta">density scatter 0.58, vs 0.31–0.44</p>
            </Node>
          </div>
        </div>
      </div>
    </figure>
  );
}
