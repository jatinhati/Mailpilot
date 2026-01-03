Placeholder icon: `mailpilot.png`

- This file currently contains a small 1x1 transparent PNG encoded as base64 (not a full-quality icon).
- To replace with a proper icon, add a PNG at `icons/mailpilot.png` (recommended sizes: 16×16, 48×48, 128×128).

To convert a base64 string to a binary PNG on Windows PowerShell:

  [IO.File]::WriteAllBytes('icons\mailpilot.png', [Convert]::FromBase64String('<paste base64 here>'))

Or simply replace this file with your own `mailpilot.png` file.