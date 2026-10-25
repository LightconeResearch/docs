import type { Item, Node } from 'fumadocs-core/page-tree';
import { docsLlms, source } from './source';
import { appName, getPageMarkdownUrl } from './shared';

// The llms.txt index: the site's name and summary, then a link to each page's Markdown.
// `index()` would title it "# Docs", so the sections are built with `indexNode()`.
export function llmsIndex() {
  const summary = source.getPage([])?.data.description;
  const sections = source.getPageTree().children.map((node) => docsLlms.indexNode(withMarkdownUrls(node)));

  return `# ${appName}\n\n> ${summary}\n\n${sections.join('\n')}`;
}

// The page tree links each page to its HTML version; agents read the Markdown one.
// Titles and descriptions still resolve: Fumadocs finds a node's page by its `$ref`, not its URL.
function withMarkdownUrls(node: Node): Node {
  if (node.type === 'page') return withMarkdownUrl(node);
  if (node.type === 'folder') {
    return {
      ...node,
      index: node.index && withMarkdownUrl(node.index),
      children: node.children.map(withMarkdownUrls),
    };
  }

  return node;
}

function withMarkdownUrl(item: Item): Item {
  const page = source.getNodePage(item);

  return page ? { ...item, url: getPageMarkdownUrl(page).url } : item;
}
