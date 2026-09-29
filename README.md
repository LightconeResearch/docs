# Lightcone Research Stack documentation

The documentation for the [Lightcone Research Stack](https://lightconeresearch.org/)
is being rebuilt. The current site stays live at <https://docs.lightconeresearch.org>
until the new one replaces it.

## Development

The site is built with [Fumadocs](https://fumadocs.dev) on Next.js, exported as
static files. It needs Node.js 22 or later.

```bash
npm install
npm run dev     # local server at http://localhost:3000
npm run build   # static export to out/
```

Pages live in `content/docs` as MDX.

## License

BSD 3-Clause — see [LICENSE](LICENSE).
