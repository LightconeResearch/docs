import Link from 'fumadocs-core/link';
import { Bot, FolderTree } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import './stack-diagram.css';

// The stack as layers, top to bottom: the report you read, the tools you and
// your agent work with, the specification, the CLI that runs it, the files it
// runs on, and the compute underneath. A dashed box marks what lives in the
// project's git repository. Each layer's name links to its section. The
// specification and CLI layers keep the card bodies from the London deck's
// "Structure of an ASTRA project" slide: a preview of astra.yaml, and the
// tools the CLI builds on.

type Line = (string | [string, string])[];

// Each line keeps its indentation and wraps, when its column is narrow, with a
// hanging indent, as an editor's soft wrap would.
function Code({ lines }: { lines: Line[] }) {
  return (
    <pre className="sd-code">
      <code>
        {lines.map((line, i) => {
          const indent = typeof line[0] === 'string' ? line[0].length - line[0].trimStart().length : 0;
          const parts = typeof line[0] === 'string' ? [line[0].trimStart(), ...line.slice(1)] : line;
          return (
            <span key={i} className="sd-line" style={{ '--indent': indent } as CSSProperties}>
              {parts.map((part, j) =>
                typeof part === 'string' ? (
                  part
                ) : (
                  <span key={j} className={part[0]}>
                    {part[1]}
                  </span>
                ),
              )}
              {parts.every((part) => part === '') && '​'}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

const astraYaml: Line[] = [
  [['k', 'decisions:']],
  ['  ', ['k', 'noise_model:']],
  ['    ', ['k', 'rationale:'], ' ', ['s', 'sets the error budget']],
  ['    ', ['k', 'options:']],
  ['      ', ['k', 'gaussian:'], ' ', ['p', '{'], ['k', 'insights:'], ' ', ['p', '['], ['ref', 'gaussian_noise'], ['p', ']}']],
  ['      ', ['k', 'heavy_tailed:'], ' ', ['p', '{'], ['k', 'excluded:'], ' ', ['b', 'true'], ['p', '}']],
  [['k', 'outputs:']],
  ['  ', ['p', '-'], ' ', ['k', 'id:'], ' ', ['id', 'fit_results']],
  ['    ', ['k', 'decisions:'], ' ', ['p', '['], ['ref', 'noise_model'], ['p', ']']],
  ['    ', ['k', 'recipe:']],
  ['      ', ['k', 'command:'], ' ', ['s', 'python src/fit.py'], ' ', ['ph', '{decisions.noise_model}']],
];

function Head({ logo, name, href, aside }: { logo?: ReactNode; name: string; href: string; aside?: string }) {
  return (
    <div className="sd-head">
      {logo}
      <p className="sd-name">
        <Link href={href} className="sd-link">
          {name}
        </Link>
        {aside && <span className="sd-aside">{aside}</span>}
      </p>
    </div>
  );
}

// A tool the CLI builds on, or runs on: its logos and a line about it.
function Tool({ logos, title, children, grid }: { logos: ReactNode; title: string; children: ReactNode; grid?: boolean }) {
  return (
    <div className="sd-tool">
      <span className={`sd-logos${grid ? ' sd-logos--grid' : ''}`}>{logos}</span>
      <p className="sd-text">
        <b>{title}</b> {children}
      </p>
    </div>
  );
}

function File({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="sd-file">
      <code>{name}</code>
      <p className="sd-text">{children}</p>
    </div>
  );
}

export function StackDiagram() {
  return (
    <figure className="sd not-prose">
      <div className="sd-band">
        <p className="sd-who">You and your agent</p>
        <div className="sd-row">
          <div className="sd-layer sd-layer--tool">
            <Head logo={<Bot aria-hidden className="sd-logo sd-logo--icon" />} name="Agent Skills" href="/agent-skills" />
            <p className="sd-text">
              Teach Claude Code or Codex to write the specification with you, drive <code>lc</code>, and write the
              report up.
            </p>
          </div>
          <div className="sd-layer sd-layer--tool">
            <Head
              logo={<img src="/logos/jupyter-logo.svg" alt="" className="sd-logo sd-logo--wordmark" />}
              name="Lightcone Lab"
              href="/lightcone-lab"
            />
            <p className="sd-text">
              A JupyterLab workbench for the project: its inventory, its pipeline, and the provenance of each
              result.
            </p>
          </div>
          <div className="sd-layer sd-layer--tool">
            <Head
              logo={<img src="/logos/myst-logo.svg" alt="" className="sd-logo sd-logo--wordmark" />}
              name="MySTRA"
              href="/mystra"
            />
            <p className="sd-text">
              Write the report in MyST and cite results and decisions by path, so numbers and figures never
              drift.
            </p>
          </div>
        </div>
      </div>

      <div className="sd-band">
        <p className="sd-who">The project</p>
        <div className="sd-layers">
          <div className="sd-repo">
            <p className="sd-repo__label">
              <FolderTree aria-hidden className="sd-repo__icon" />
              One git repository
            </p>

            <div className="sd-layer">
              <Head
                logo={<img src="/logos/astra.svg" alt="" className="sd-logo sd-logo--ink" />}
                name="astra.yaml"
                href="/astra"
                aside="ASTRA"
              />
              <div className="sd-split">
                <Code lines={astraYaml} />
                <p className="sd-text">
                  The analysis as structured data: <b>insights</b> from the literature, <b>decisions</b> with their{' '}
                  <b>rationale</b> and the options not taken, <b>recipes</b> that make each <b>output</b>, and the{' '}
                  <b>findings</b> the outputs support.
                </p>
              </div>
            </div>

            <div className="sd-layer sd-layer--strong">
              <Head
                logo={<img src="/logos/lightcone-mark.svg" alt="" className="sd-logo sd-logo--ink" />}
                name="lc"
                href="/lightcone-cli"
                aside="Lightcone CLI"
              />
              <p className="sd-text">
                Reads the specification, runs each recipe sandboxed, and commits every result with{' '}
                <b>certified provenance</b>: what ran, on which inputs, in which environment, under which sandbox.
              </p>
              <div className="sd-tools">
                <Tool
                  title="Code and artifact versioning"
                  logos={
                    <>
                      <img src="/logos/git.svg" alt="git" />
                      <img src="/logos/git-annex.svg" alt="git-annex" />
                    </>
                  }
                >
                  Code and spec in git, data and results in git-annex: every output committed with a
                  content-addressed run record.
                </Tool>
                <Tool
                  title="Reusable environment"
                  logos={
                    <>
                      <img src="/logos/uv.svg" alt="uv" className="sd-logo--uv" />
                      <img src="/logos/docker.svg" alt="Docker" />
                    </>
                  }
                >
                  A uv lockfile, optionally in a container image, hashed on every output; recipes run sandboxed.
                </Tool>
              </div>
            </div>

            <div className="sd-files">
              <File name="src/">Your code, in git. A recipe names the command that runs it.</File>
              <File name="data/">Input data, carried by git-annex.</File>
              <File name="results/">
                What <code>lc</code> produced, each with a manifest and run record.
              </File>
            </div>
          </div>
        </div>
      </div>

      <div className="sd-band">
        <p className="sd-who">Where it runs</p>
        <div className="sd-layer sd-layer--compute">
          <Head name="Compute" href="/lightcone-cli/configuring-compute" />
          <Tool
            title="From a laptop to a cluster"
            grid
            logos={
              <>
                <img src="/logos/kubernetes.svg" alt="Kubernetes" />
                <img src="/logos/dask.svg" alt="Dask" />
                <img src="/logos/slurm.png" alt="Slurm" className="sd-logo--slurm" />
              </>
            }
          >
            Recipes run on your machine, or on Dask, Kubernetes or Slurm clusters, under the same run record.
          </Tool>
        </div>
      </div>
    </figure>
  );
}
