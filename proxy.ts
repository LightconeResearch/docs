import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute } from '@/lib/shared';

// Serves each page's Markdown at its URL with `.md` appended, or at its URL itself
// to agents that ask for Markdown. The docs live at the site's root, so the patterns
// have no prefix, unlike the Fumadocs template's `${docsRoute}{/*path}`.
const { rewrite: rewriteDocs } = rewritePath('{/*path}', `${docsContentRoute}{/*path}/content.md`);
const { rewrite: rewriteSuffix } = rewritePath('{/*path}.md', `${docsContentRoute}{/*path}/content.md`);

export default function proxy(request: NextRequest) {
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // `.md` URLs, except the Markdown routes themselves
    '/((?!llms\\.mdx/).+\\.md)',
    // Pages, but not Next.js internals, route handlers or files. Only requests that accept
    // Markdown reach the proxy, so browsers get the pages without it.
    {
      source: '/((?!_next/|api/|og/|llms\\.mdx/)[^.]*)',
      has: [{ type: 'header', key: 'accept', value: '.*text/(markdown|x-markdown|plain).*' }],
    },
  ],
};
