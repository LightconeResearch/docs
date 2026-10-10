# Agent demo video

The video on the Overview page: Claude Code scoping a supernova analysis with the user, writing
it into `astra.yaml`, then running it with `lc`.

It is a scripted replay, not a live session. `replay.py` draws a Claude Code session in the
terminal; the `lc` output in it is copied from a real run of the same analysis. [VHS](https://github.com/charmbracelet/vhs)
types the user's turns, picks the answer to the agent's question, and records the screen. There
is one tape per site theme:

- `agent.tape`: the dark theme, saved as `public/videos/agent-demo/agent.{mp4,webm}`.
- `agent-light.tape`: the light theme, saved as `public/videos/agent-demo/agent-light.{mp4,webm}`.

## Re-recording

You need VHS (which brings ttyd and ffmpeg), Python 3 and the JetBrains Mono font. Run the tapes
from this folder, since they start `replay.py` by its relative path:

```sh
cd media/agent-demo
vhs agent.tape
vhs agent-light.tape
```

Each takes a few minutes. To change what the session shows, edit `main()` in `replay.py`; the
tapes wait for its text (`Enter to select`, `Shall I implement`, `Worked for`), so keep those
phrases or update the `Wait+Screen` lines to match.
