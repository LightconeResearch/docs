import { docsLlms, source } from './source';
import { appName, getPageMarkdownUrl } from './shared';

// What an agent needs before it reads any page: what the stack is, and how to set a user up.
// Keep it in step with the Quick Start (content/docs/(stack)/quickstart.mdx).
const intro = `# ${appName}

> Open tooling for rigorous, reproducible research with AI agents. An analysis is described in ASTRA (\`astra.yaml\`), run with the Lightcone CLI (\`lc\`), which records the provenance of every output, and driven by the user's coding agent through the Lightcone plugin.

## For agents

To set a user up with the stack:

1. Check that uv 0.12 or later is installed (\`uv --version\`). If it is missing or older, see https://docs.astral.sh/uv/getting-started/installation/.
2. Install the \`lightcone\` plugin from the \`lightcone-research\` plugin marketplace, https://github.com/LightconeResearch/agent-skills. Its README gives the commands for Claude Code, Codex and their desktop apps. Ask the user before installing anything. In Codex, the user must approve the plugin's hooks.
3. Make sure the plugin is enabled, then reload the plugins (\`/reload-plugins\` in Claude Code) or ask the user to restart the agent: skills and hooks load when a session starts.
4. To start an analysis, work in an empty directory and use the \`lightcone\` skill. A user can trigger it by saying "I want to start a new Lightcone analysis: <research question>". The plugin offers to install the Lightcone CLI when it is missing.

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
