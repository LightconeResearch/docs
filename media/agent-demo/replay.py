"""A scripted replay of a Claude Code session driving the Lightcone Stack.

Drawn in the style of Claude Code 2.1 for a docs animation, and driven by VHS,
which types the user's turns and picks the answer to the agent's question.
The `lc` lines are copied from a real run of the same analysis.
"""

import os
import re
import select
import sys
import termios
import textwrap
import time
import tty


def rgb(r, g, b):
    return f"\x1b[38;2;{r};{g};{b}m"


def bg(r, g, b):
    return f"\x1b[48;2;{r};{g};{b}m"


R = "\x1b[0m"
B = "\x1b[1m"
# Claude Code's dark and light themes; CC_THEME=light picks the light one.
LIGHT = os.environ.get("CC_THEME") == "light"
ORANGE = rgb(215, 119, 87)
TEXT = rgb(31, 31, 31) if LIGHT else rgb(232, 232, 232)
DIM = rgb(110, 110, 110) if LIGHT else rgb(150, 150, 150)
FAINT = rgb(160, 160, 160) if LIGHT else rgb(105, 105, 105)
GREEN = rgb(44, 122, 57) if LIGHT else rgb(78, 186, 101)
LAV = rgb(87, 105, 247) if LIGHT else rgb(177, 185, 249)
RULE = rgb(200, 200, 200) if LIGHT else rgb(88, 88, 88)
USERBG = bg(240, 240, 240) if LIGHT else bg(55, 55, 55)
ADDBG = bg(218, 245, 222) if LIGHT else bg(30, 66, 40)
CHIPBG = bg(225, 228, 252) if LIGHT else bg(70, 70, 110)

COLS, ROWS = os.get_terminal_size()
W = min(COLS, 118)

SPIN = "·✢✳✶✻✽✻✶✳✢"


def inline(s):
    """`code` spans in lavender, **bold** in bold."""
    s = re.sub(r"`([^`]+)`", lambda m: f"{LAV}{m.group(1)}{TEXT}", s)
    s = re.sub(r"\*\*([^*]+)\*\*", lambda m: f"{B}{m.group(1)}\x1b[22m", s)
    return s


def wrap(text, width):
    return textwrap.wrap(text, width, break_long_words=False, break_on_hyphens=False) or [""]


class Screen:
    def __init__(self):
        self.lines = []          # transcript, already styled
        self.input = ""
        self.mode = "idle"       # idle | input | busy | ask
        self.verb = ""
        self.t0 = time.time()
        self.ask = None
        self.choice = 0
        self.header()

    # -- transcript -------------------------------------------------------
    def header(self):
        self.lines += [
            "",
            f" {ORANGE} ▐▛███▜▌ {R}  {B}{TEXT}Claude Code{R} {DIM}v2.1.296{R}",
            f" {ORANGE}▝▜█████▛▘{R}  {DIM}Opus 5.5 · Claude Max{R}",
            f" {ORANGE}  ▘▘ ▝▝  {R}  {DIM}~/sn-cosmology{R}",
            "",
        ]

    def user(self, text):
        rows = wrap(text, W - 4)
        for i, row in enumerate(rows):
            lead = "❯ " if i == 0 else "  "
            pad = " " * (W - 2 - len(lead) - len(row))
            self.lines.append(f"{USERBG}{DIM}{lead}{TEXT}{row}{pad}{R}")
        self.lines.append("")

    def say(self, text):
        for i, row in enumerate(wrap(text, W - 4)):
            lead = f"{TEXT}● " if i == 0 else "  "
            self.lines.append(f"{lead}{TEXT}{inline(row)}{R}")
        self.lines.append("")

    def tool(self, name, arg, out=(), dim_out=False):
        self.lines.append(f"{GREEN}●{R} {B}{TEXT}{name}{R}{TEXT}({arg}){R}")
        for i, row in enumerate(out):
            lead = f"  {DIM}⎿{R}  " if i == 0 else "     "
            color = DIM if dim_out else TEXT
            self.lines.append(f"{lead}{color}{row}{R}")
        self.lines.append("")

    # -- drawing ----------------------------------------------------------
    def footer(self):
        rule = f"{RULE}{'─' * W}{R}"
        if self.mode == "ask":
            q = self.ask
            rows = [rule, f" {CHIPBG}{TEXT} ☐ {q['chip']} {R}", "", f" {B}{TEXT}{q['question']}{R}", ""]
            for i, (label, desc) in enumerate(q["options"]):
                on = i == self.choice
                mark = f"{LAV}❯{R}" if on else " "
                color = LAV if on else TEXT
                rows.append(f" {mark} {color}{i + 1}. {label}{R}")
                rows.append(f"      {DIM}{desc}{R}")
            rows += [f"   {DIM}{len(q['options']) + 1}. Type something.{R}", "",
                     f" {DIM}Enter to select · ↑/↓ to navigate · Esc to cancel{R}"]
            return rows
        busy = []
        if self.mode == "busy":
            g = SPIN[int(time.time() * 8) % len(SPIN)]
            secs = int(time.time() - self.t0)
            busy = [f"{ORANGE}{g} {self.verb}…{R} {DIM}({secs}s · esc to interrupt){R}", ""]
        cursor = f"\x1b[7m \x1b[27m" if self.mode in ("idle", "input") else ""
        typed = textwrap.wrap(self.input, W - 4, drop_whitespace=False) or [""]
        prompt = [f"{TEXT}{'❯ ' if i == 0 else '  '}{row}{R}" for i, row in enumerate(typed)]
        prompt[-1] += cursor
        return busy + [rule, *prompt, rule, f"  {DIM}? for shortcuts{R}"]

    def draw(self):
        foot = self.footer()
        room = ROWS - len(foot) - 1
        body = self.lines[-room:] if len(self.lines) > room else self.lines
        body = body + [""] * (room - len(body))
        out = ["\x1b[H"]
        for row in body + [""] + foot:
            out.append(row + "\x1b[K\r\n")
        frame = "".join(out)[:-2]
        if frame != getattr(self, "last", None):
            self.last = frame
            sys.stdout.write(frame)
            sys.stdout.flush()

    # -- timing -----------------------------------------------------------
    def wait(self, secs):
        end = time.time() + secs
        while time.time() < end:
            self.draw()
            time.sleep(1 / 30)
            self.drain()

    def drain(self):
        while select.select([sys.stdin], [], [], 0)[0]:
            os.read(sys.stdin.fileno(), 64)

    def busy(self, verb, secs):
        self.mode, self.verb = "busy", verb
        self.wait(secs)

    def read_line(self):
        self.mode, self.input = "input", ""
        buf = b""
        while True:
            self.draw()
            if select.select([sys.stdin], [], [], 1 / 30)[0]:
                buf += os.read(sys.stdin.fileno(), 64)
                text = buf.decode("utf-8", "ignore")
                if "\r" in text or "\n" in text:
                    line = re.split(r"[\r\n]", text)[0]
                    self.input = ""
                    return line
                self.input = text.replace("\x7f", "")

    def choose(self, ask):
        self.mode, self.ask, self.choice = "ask", ask, 0
        while True:
            self.draw()
            if select.select([sys.stdin], [], [], 1 / 30)[0]:
                key = os.read(sys.stdin.fileno(), 16)
                if key.endswith(b"[B"):
                    self.choice = min(self.choice + 1, len(ask["options"]) - 1)
                elif key.endswith(b"[A"):
                    self.choice = max(self.choice - 1, 0)
                elif key in (b"\r", b"\n"):
                    self.mode = "busy"
                    return ask["options"][self.choice][0]


def main(s):
    s.wait(0.3)

    # 1. The research question
    s.user(s.read_line())
    s.t0 = time.time()
    s.busy("Scoping", 1.6)
    s.say("A new analysis, so we scope it before any code: one input, the Union2.1 "
          "compilation of 580 supernovae, and two outputs, `best_fit` and `hubble_diagram`.")
    s.wait(0.8)
    s.say("One choice matters before we fit: the file's error column is statistical only.")
    s.wait(0.6)
    ask = {
        "chip": "Covariance",
        "question": "Which uncertainties should the fit use?",
        "options": [
            ("Statistical only", "The error column in the data file."),
            ("Statistical and systematic", "Union2.1's full covariance matrix, as in the paper."),
            ("Both, as two universes", "Run the fit both ways, and see whether the choice matters."),
        ],
    }
    answer = s.choose(ask)
    s.lines.append(f"{TEXT}● User answered Claude's questions:{R}")
    s.lines.append(f"  {DIM}⎿{R}  {DIM}· {ask['question']} → {R}{TEXT}{answer}{R}")
    s.lines.append("")

    # 2. The specification
    s.busy("Writing the specification", 1.2)
    s.tool("Bash", "lc init", ["✓ Project converged at ~/sn-cosmology"])
    s.wait(0.5)
    s.busy("Writing the specification", 1.0)
    diff = [
        ("13", "decisions:"),
        ("14", "  covariance:"),
        ("15", "    rationale: The error column is statistical only; systematics"),
        ("16", "      widen the constraint."),
        ("17", "    options:"),
        ("18", "      stat_only: {label: Statistical only}"),
        ("19", "      stat_sys: {label: Statistical and systematic}"),
    ]
    s.lines.append(f"{GREEN}●{R} {B}{TEXT}Update{R}{TEXT}(astra.yaml){R}")
    s.lines.append(f"  {DIM}⎿{R}  {TEXT}Added 36 lines{R}")
    for n, code in diff:
        s.lines.append(f"     {ADDBG}{DIM}{n:>3} {GREEN}+{TEXT}{code:<{W - 12}}{R}")
        s.wait(0.07)
    s.lines.append(f"     {DIM}✓ astra validate: schema and semantics pass{R}")
    s.lines.append("")
    s.wait(0.6)
    s.tool("Write", "universes/with_systematics.yaml", ["Wrote 4 lines to universes/with_systematics.yaml"])
    s.wait(0.4)
    s.say("The plan is in `astra.yaml`: 1 input, 2 outputs, and 1 decision with two universes, "
          "`baseline` and `with_systematics`. Nothing has run yet. Shall I implement it and "
          "produce the results?")
    s.mode = "idle"

    # 3. Implementation and results
    s.user(s.read_line())
    s.busy("Implementing", 1.3)
    s.tool("Write", "src/fit.py", ["Wrote 42 lines to src/fit.py"])
    s.wait(0.35)
    s.tool("Write", "src/plot_hubble.py", ["Wrote 57 lines to src/plot_hubble.py"])
    s.busy("Implementing", 0.8)
    s.tool("Bash", 'git commit -am "Implement the fit and the Hubble diagram"',
           ["[master 7b192d9] Implement the fit and the Hubble diagram"])
    s.busy("Starting compute", 0.9)
    s.tool("Bash", "lc compute launch --wait", ["local"])
    s.busy("Materializing", 0.6)
    made = [
        f"{GREEN}✓{TEXT} made with_systematics/best_fit",
        f"{GREEN}✓{TEXT} made baseline/best_fit",
        f"{GREEN}✓{TEXT} made with_systematics/hubble_diagram",
        f"{GREEN}✓{TEXT} made baseline/hubble_diagram",
        "",
        f"{GREEN}✓{TEXT} Made 4 output(s) in ~/sn-cosmology",
    ]
    s.lines.append(f"{GREEN}●{R} {B}{TEXT}Bash{R}{TEXT}(lc materialize local){R}")
    for i, row in enumerate(made):
        s.lines.append((f"  {DIM}⎿{R}  " if i == 0 else "     ") + row + R)
        s.busy("Materializing", 0.35)
    s.lines.append("")
    s.busy("Checking provenance", 0.7)
    s.tool("Bash", "lc status", [
        f"{DIM}·{TEXT} current  baseline/best_fit                7b192d9",
        f"{DIM}·{TEXT} current  with_systematics/best_fit        7b192d9",
        f"{DIM}·{TEXT} current  baseline/hubble_diagram          7b192d9",
        f"{DIM}·{TEXT} current  with_systematics/hubble_diagram  7b192d9",
    ])
    s.busy("Checking provenance", 0.8)
    s.say("**ΩΛ = 0.722 ± 0.013** with statistical errors only, and **0.714 ± 0.030** with "
          "systematics: the value barely moves, the uncertainty more than doubles. Each result "
          "is committed at `7b192d9` beside a manifest of its recipe, decisions, environment "
          "and input hashes.")
    s.lines.append(f"{DIM}✻ Worked for 2m 41s{R}")
    s.lines.append("")
    s.mode = "idle"
    s.wait(30)


if __name__ == "__main__":
    fd = sys.stdin.fileno()
    saved = termios.tcgetattr(fd)
    sys.stdout.write("\x1b[?1049h\x1b[?25l\x1b[2J")
    try:
        tty.setraw(fd)
        main(Screen())
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, saved)
        sys.stdout.write("\x1b[?25h\x1b[?1049l")
