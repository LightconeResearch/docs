import { docsLlms, source } from './source';
import { appName, getPageMarkdownUrl } from './shared';

// What an agent needs before it reads any page: what the stack is, and how to set a user up.
// Keep it in step with the Quick Start (content/docs/(stack)/quickstart.mdx).
const intro = `# ${appName}

> Open tooling for rigorous, reproducible research with AI agents. An analysis is described in ASTRA (\`astra.yaml\`), run with the Lightcone CLI (\`lc\`), which records the provenance of every output, and driven by the user's coding agent through the Lightcone plugin.

## For agents

To help a user set up the stack, give them these instructions to follow themselves; do not install anything on their behalf.

1. Install uv 0.12 or later, and check with \`uv --version\`: https://docs.astral.sh/uv/getting-started/installation/.
2. Add the \`lightcone\` plugin from the \`lightcone-research\` plugin marketplace:
   - Claude Code: \`claude plugin marketplace add LightconeResearch/agent-skills\`, then \`claude plugin install lightcone@lightcone-research\`.
   - Codex: \`codex plugin marketplace add LightconeResearch/agent-skills\`, then \`codex plugin add lightcone@lightcone-research\`. Approve the plugin's hooks when Codex asks.
   - Desktop apps: see https://github.com/LightconeResearch/agent-skills.
3. Enable the plugin and reload it (\`/reload-plugins\` in Claude Code), or restart the agent: skills and hooks load when a session starts.
4. To start an analysis, start the agent in an empty directory and say "I want to start a new Lightcone analysis: <research question>". This loads the \`lightcone\` skill, which offers to install the Lightcone CLI when it is missing.

Every page below is plain Markdown. The whole documentation is also available as one file: /llms-full.txt. For questions, the team is on Discord: https://discord.gg/EbG6JKuyAx.

## Documentation
`;

// The generated index links each page to its HTML version; agents read the Markdown one.
export async function llmsIndex() {
  const markdownUrls = new Map(source.getPages().map((page) => [page.url, getPageMarkdownUrl(page).url]));
  // Drop the generated "# Docs" heading: the intro carries the title.
  const index = (await docsLlms.index()).replace(/^# .*\n+/, '');
  const links = index.replace(/\]\((\/[^)]*)\)/g, (link, url: string) =>
    markdownUrls.has(url) ? `](${markdownUrls.get(url)})` : link,
  );

  return `${intro}\n${links}`;
}
