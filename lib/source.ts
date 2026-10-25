import { createElement } from 'react';
import { llms, loader, type LoaderPlugin } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import type { Nodes } from 'mdast';

// `<ForAgents>` holds notes for agents: the site renders nothing for it (components/mdx.tsx),
// search skips it, and the Markdown versions of the page keep its content, unwrapped.
const isForAgents = (node: Nodes) => 'name' in node && node.name === 'ForAgents';

// Search records a node's `structuredData` in place of its content: here, nothing.
function remarkForAgents() {
  const skip = (node: Nodes) => {
    if (isForAgents(node)) node.data = { ...node.data, structuredData: { contents: [] } };
    else if ('children' in node) node.children.forEach(skip);
  };

  return skip;
}

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    // A collection's own `mdxOptions` replace Fumadocs' default plugins; the preset keeps them.
    mdxOptions: applyMdxPreset({ remarkPlugins: [remarkForAgents] }),
    postprocess: {
      includeProcessedMarkdown: {
        filterElement: (node) => (isForAgents(node) ? 'children-only' : true),
      },
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Command pages are named after the command they document (`lc init`, …), so the
// navigation shows those names as code: monospace, and clear of the interface's small capitals.
const commandNamesAsCode: LoaderPlugin = {
  name: 'command-names-as-code',
  transformPageTree: {
    file(node, filePath) {
      if (!filePath?.startsWith('lightcone-cli/commands/')) return node;
      return { ...node, name: createElement('code', { key: 'name' }, node.name) };
    },
  },
};

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  // Resolves `icon` names in frontmatter and meta.json, such as each project's icon in the selector.
  plugins: [lucideIconsPlugin(), commandNamesAsCode],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
