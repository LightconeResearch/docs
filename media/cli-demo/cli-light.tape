Output ../../public/videos/cli-demo/cli-light.mp4
Output ../../public/videos/cli-demo/cli-light.webm

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
Set Theme { "name": "Claude Light", "background": "#ffffff", "foreground": "#1f1f1f", "cursor": "#1f1f1f", "selection": "#d8dcf8", "black": "#1f1f1f", "brightBlack": "#6e6e6e", "red": "#c4314b", "brightRed": "#d9536b", "green": "#2c7a39", "brightGreen": "#3d9a4d", "yellow": "#966c1e", "brightYellow": "#b5862d", "blue": "#5769f7", "brightBlue": "#7584f8", "magenta": "#d77757", "brightMagenta": "#e08f74", "cyan": "#2a7f8f", "brightCyan": "#3a98a9", "white": "#e0e0e0", "brightWhite": "#ffffff" }

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
