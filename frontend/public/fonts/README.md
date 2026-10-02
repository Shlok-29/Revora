# Custom Fonts Directory

To load local font files for **Atlante Display**, place your font file here with one of the following names:
- `AtlanteDisplay.woff2`
- `AtlanteDisplay.otf`
- `AtlanteDisplay.ttf`

The application's `@font-face` definition in `frontend/src/styles/index.css` automatically checks:
1. Locally installed fonts on your system (`local('Atlante Display')`, `local('AtlanteDisplay')`, `local('Atlante')`)
2. Files in `/fonts/AtlanteDisplay.woff2`, `/fonts/AtlanteDisplay.otf`, or `/fonts/AtlanteDisplay.ttf`
3. Fallback high-contrast display serif typography
