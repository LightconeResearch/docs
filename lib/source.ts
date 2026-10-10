import { createElement } from 'react';
import { llms, loader, type LoaderPlugin } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
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
