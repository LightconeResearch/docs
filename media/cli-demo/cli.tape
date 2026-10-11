Output ../../public/videos/cli-demo/cli.mp4
Output ../../public/videos/cli-demo/cli.webm

Set Shell bash
Set FontFamily "JetBrains Mono"
Set FontSize 17
Set LineHeight 1.15
Set Width 1280
Set Height 800
Set Padding 24
Set Framerate 20
Set TypingSpeed 45ms
Set CursorBlink false
Set Theme { "name": "Claude Dark", "background": "#181818", "foreground": "#e8e8e8", "cursor": "#e8e8e8", "selection": "#3a3a3a", "black": "#181818", "brightBlack": "#696969", "red": "#ff6b80", "brightRed": "#ff8a9a", "green": "#4eba65", "brightGreen": "#6fd283", "yellow": "#ffc107", "brightYellow": "#ffd54f", "blue": "#b1b9f9", "brightBlue": "#c8cdfb", "magenta": "#d77757", "brightMagenta": "#e8957a", "cyan": "#8fc6d6", "brightCyan": "#b0dbe6", "white": "#e8e8e8", "brightWhite": "#ffffff" }

Hide
Type "source setup.sh && clear" Enter
Sleep 500ms
Show

Sleep 800ms
Type "lc init line-fit"
Sleep 400ms
Enter
Wait+Screen@60s /Project converged/
Sleep 1.5s
Type "cd line-fit"
Sleep 300ms
Enter
Sleep 600ms

# Write the specification, scripts and data off camera, as you would by hand.
Hide
Type "$DEMO/stage.sh && clear" Enter
Sleep 800ms
Show

Type "uv add numpy matplotlib"
Sleep 400ms
Enter
Wait+Screen@120s /\+ six/
Sleep 1.5s
Type 'git add -A && git commit -qm "Line-fit analysis"'
Sleep 400ms
Enter
Sleep 1s
Type "lc compute launch --wait"
Sleep 400ms
Enter
Wait+Screen@60s /is ready/
Sleep 1.2s
Type "clear" Enter
Sleep 300ms
Type "lc materialize local"
Sleep 400ms
Enter
Wait+Screen@180s /Made 2 output/
Sleep 1.5s
Type "lc status"
Sleep 400ms
Enter
Wait+Screen@30s /2 current/
Sleep 3s
Type "lc compute down local"
Sleep 400ms
Enter
Sleep 3s
