Output ../../public/videos/agent-demo/agent.mp4
Output ../../public/videos/agent-demo/agent.webm

Set Shell bash
Set FontFamily "JetBrains Mono"
Set FontSize 17
Set LineHeight 1.15
Set Width 1280
Set Height 800
Set Padding 24
Set Framerate 20
Set TypingSpeed 30ms
Set CursorBlink false
Set Theme { "name": "Claude Dark", "background": "#181818", "foreground": "#e8e8e8", "cursor": "#e8e8e8", "selection": "#3a3a3a", "black": "#181818", "brightBlack": "#696969", "red": "#ff6b80", "brightRed": "#ff8a9a", "green": "#4eba65", "brightGreen": "#6fd283", "yellow": "#ffc107", "brightYellow": "#ffd54f", "blue": "#b1b9f9", "brightBlue": "#c8cdfb", "magenta": "#d77757", "brightMagenta": "#e8957a", "cyan": "#8fc6d6", "brightCyan": "#b0dbe6", "white": "#e8e8e8", "brightWhite": "#ffffff" }

Hide
Type "clear && python3 -I replay.py" Enter
Wait+Screen /Claude Code/
Show

Sleep 900ms
Type "/lightcone:lightcone I want to start a new analysis: fit flat LCDM to the Union2.1 supernovae and recover Omega_Lambda."
Sleep 600ms
Enter
Wait+Screen@30s /Enter to select/
Sleep 2.2s
Down
Sleep 450ms
Down
Sleep 900ms
Enter
Wait+Screen@30s /Shall I implement/
Sleep 1.8s
Type "Yes, go ahead."
Sleep 500ms
Enter
Wait+Screen@60s /Worked for/
Sleep 5s
