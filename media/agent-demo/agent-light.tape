Output ../../public/videos/agent-demo/agent-light.mp4
Output ../../public/videos/agent-demo/agent-light.webm

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
Set Theme { "name": "Claude Light", "background": "#ffffff", "foreground": "#1f1f1f", "cursor": "#1f1f1f", "selection": "#d8dcf8", "black": "#1f1f1f", "brightBlack": "#6e6e6e", "red": "#c4314b", "brightRed": "#d9536b", "green": "#2c7a39", "brightGreen": "#3d9a4d", "yellow": "#966c1e", "brightYellow": "#b5862d", "blue": "#5769f7", "brightBlue": "#7584f8", "magenta": "#d77757", "brightMagenta": "#e08f74", "cyan": "#2a7f8f", "brightCyan": "#3a98a9", "white": "#e0e0e0", "brightWhite": "#ffffff" }

Hide
Type "clear && CC_THEME=light python3 -I replay.py" Enter
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
