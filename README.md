# Lightcone Research Stack documentation

Source for the [Lightcone Research Stack](https://lightconeresearch.org/) documentation.
The public site is at <https://docs.lightconeresearch.org>.

## Development

The site is built with [Fumadocs](https://fumadocs.dev) on Next.js, exported as
static files. It needs Node.js 22 or later.

```bash
npm install
npm run dev     # local server at http://localhost:3000
npm run build   # static export to out/
```

Pages live in `content/docs` as MDX. Fumadocs builds navigation from each folder's
`meta.json`, and the `(stack)` folder groups pages without adding a URL segment.
See its [Markdown guide](https://www.fumadocs.dev/docs/markdown) and
[page conventions](https://www.fumadocs.dev/docs/page-conventions).

## Editing the docs

Keep shared explanations in one place and link to them:

| Topic | Main page or section |
| --- | --- |
| How the stack fits together | `content/docs/(stack)/what-is-lightcone.mdx` |
| ASTRA concepts and purpose | `content/docs/(stack)/astra.mdx` |
| uv, git and CLI installation | `content/docs/(stack)/installation.mdx` |
| Plugin installation and agent behavior | `content/docs/agent-skills/` |
| Execution, output states and command options | `content/docs/lightcone-cli/` |
| Report syntax and build behavior | `content/docs/mystra/` |
| JupyterLab setup and features | `content/docs/lightcone-lab/` |

Overviews should explain what a component does and where to start. Tutorials should
keep enough context to follow the task, then link to reference pages for details.
Preserve page URLs and use explicit heading anchors when renaming linked sections.

Write concrete descriptions of behavior: what the reader runs, what file changes,
and what a check establishes. Avoid slogans, repeated summaries and claims such as
“always correct” or “updates itself.” Distinguish implemented behavior from plans.
[Google's style guide](https://developers.google.com/style/tone) is useful for tone;
[Wikipedia's AI-writing guide](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
can help spot repetitive phrasing, but is not an authorship test.

Check technical claims against the component's source and pinned version. In a
multi-repository checkout, the relevant projects include `../lightcone-cli`,
`../agent-skills`, `../MySTRA`, `../astra-spec`, `../astra-tools`, and
`../jupyterlab-lightcone`. A successful build checks MDX and types, not scientific
claims or example results.

Before finishing, run `npm run build`, `npm run types:check`, and check changed links
and examples. Preview embedded content at desktop and narrow widths. The paper on
the ASTRA page is hosted externally, so keep its full-window link available.

## License

BSD 3-Clause — see [LICENSE](LICENSE).
