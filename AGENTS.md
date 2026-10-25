<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Notes for agents in the documentation

To tell agents something that readers don't need, such as how to help a user through a page, put
it in the `note` prop of `<ForAgents>`:

```mdx
<ForAgents note="If you are helping a user set up the stack, tell them to follow the steps below themselves. Do not run them on their behalf." />
```

The site renders nothing for it (`components/mdx.tsx`). The page's Markdown keeps the element as
written, and agents get that Markdown through the links in `/llms.txt`, at `/<page>.md`, at the
page's own URL when they ask for Markdown (`proxy.ts`), and in `/llms-full.txt`.

Write the note in the prop, not as children: site search indexes an element's children but not its
props. Both behaviours are Fumadocs defaults, so check them after upgrading Fumadocs: the Markdown
keeps a component that doesn't call `asMarkdown()` as written, and search skips its props.
