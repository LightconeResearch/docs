# Lightcone Research Stack documentation

The documentation for the [Lightcone Research Stack](https://lightconeresearch.org/)
is being rebuilt. The current site stays live at <https://docs.lightconeresearch.org>
until the new one replaces it.

## Development

The site is built with [Fumadocs](https://fumadocs.dev) on Next.js, and deployed
to Vercel from `main`, with a preview deployment for each pull request. It needs
Node.js 22 or later.

```bash
npm install
npm run dev     # local server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build at http://localhost:3000
```

Pages live in `content/docs` as MDX. Each page's Markdown is served at its URL
with `.md` appended, or at its URL itself to requests that accept `text/markdown`.

## License

BSD 3-Clause — see [LICENSE](LICENSE).
