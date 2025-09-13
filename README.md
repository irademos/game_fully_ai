feat: improve rendering quality and responsiveness (setPixelRatio + window resize handling).
feat: add live ping display in Settings overlay with periodic RTT measurement between peers.
feat: add in-game FPS overlay (bottom-right) for immediate performance visibility.
feat: add in-game Controls Help overlay ("? Help" button) with scoped styles, initialized once from app.js.
feat: add subtle ground grid helper for immediate world orientation.
feat: add in-game screenshot button (📸) to action bar; downloads a PNG of the current frame
feat: add Day/Night toggle button (🌗) to switch scene lighting and sky.
fix: initialize day/night toggle after lights are created to avoid undefined references and ensure it works on load.
feat: add on-screen compass HUD showing camera heading (top-center).
feat: add position/heading HUD (bottom-left), updates each frame.
feat: add K hotkey to instantly download a screenshot of the current view.
