# CLI demo video

The video on the Lightcone CLI's Overview page: `lc init` creates a project, then `uv add`,
`git commit`, `lc compute launch`, `lc materialize` and `lc status` run a small
line-fit analysis and show its committed results.

Unlike the [agent demo](../agent-demo), it is a live recording: every command really runs, in
`/tmp/lightcone-demo`, which each tape empties first. Between `lc init` and the first run, the
tape copies `project/` (the specification, scripts, data and universe) into the new project and
adds a license, off camera. There is one tape per site theme:

- `cli.tape`: the dark theme, saved as `public/videos/cli-demo/cli.{mp4,webm}`.
- `cli-light.tape`: the light theme, saved as `public/videos/cli-demo/cli-light.{mp4,webm}`.

## Re-recording

You need VHS (which brings ttyd and ffmpeg), uv, git-annex, the JetBrains Mono font, and the `lc`
you want to show on your `PATH`. Run the tapes from this folder, since they source `setup.sh` by its
relative path. To record the CLI from a checkout of lightcone-cli next to this repository:

```sh
cd media/cli-demo
export PATH=$PWD/../../../lightcone-cli/.venv/bin:$PATH
vhs cli.tape
vhs cli-light.tape
```

Each takes about three minutes. The tapes wait for the commands' output (`Project converged`,
`+ six`, `is ready`, `Made 2 output`, `2 current`), so update the `Wait+Screen` lines if a command's
output changes.
