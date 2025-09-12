/**
 * Lightweight in-game Controls Help overlay.
 * No top-level side effects; call initControlsHelp() once after scene is ready.
 */
export function initControlsHelp() {
  if (typeof document === "undefined") return { show() {}, hide() {}, toggle() {}, destroy() {} };

  // Inject scoped styles once
  const styleId = "fai-controls-help-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .fai-help-btn {
        position: fixed;
        right: 12px;
        bottom: 12px;
        z-index: 10000;
        background: rgba(20,20,30,0.85);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        padding: 8px 10px;
        cursor: pointer;
        font-family: 'Press Start 2P', system-ui, sans-serif;
        font-size: 12px;
        user-select: none;
      }
      .fai-help-btn:hover { background: rgba(40,40,60,0.9); }

      .fai-help-panel {
        position: fixed;
        right: 12px;
        bottom: 56px;
        width: 280px;
        max-width: calc(100vw - 24px);
        background: rgba(0,0,0,0.82);
        color: #fff;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.2);
        padding: 12px 12px 10px 12px;
        z-index: 10000;
        backdrop-filter: blur(2px);
        box-shadow: 0 6px 18px rgba(0,0,0,0.35);
      }
      .fai-help-panel.hidden { display: none; }
      .fai-help-panel h3 {
        margin: 0 24px 8px 0;
        font-size: 14px;
        font-family: 'Press Start 2P', system-ui, sans-serif;
        letter-spacing: 0.5px;
      }
      .fai-help-panel .fai-help-close {
        position: absolute;
        top: 6px;
        right: 8px;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.8;
      }
      .fai-help-panel .fai-section-title {
        margin: 8px 0 4px 0;
        font-size: 12px;
        color: #9fd3ff;
        font-family: 'Press Start 2P', system-ui, sans-serif;
      }
      .fai-help-panel ul {
        list-style: none;
        padding: 0;
        margin: 0 0 6px 0;
      }
      .fai-help-panel li {
        font-size: 12px;
        line-height: 1.45;
        font-family: monospace;
        opacity: 0.95;
      }
    `;
    document.head.appendChild(style);
  }

  // Create help button
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "fai-help-btn";
  btn.textContent = "? Help";

  // Create panel
  const panel = document.createElement("div");
  panel.className = "fai-help-panel hidden";
  panel.innerHTML = `
    <div class="fai-help-close" aria-label="Close" title="Close">✕</div>
    <h3>Controls</h3>
    <div class="fai-section-title">Desktop</div>
    <ul>
      <li>Move: WASD or Arrow Keys</li>
      <li>Jump: Space</li>
      <li>Shoot block: B (Burst: hold N)</li>
      <li>Voice chat: Unmute button</li>
      <li>Voice commands: Hold 🎤 (say "jump", "fire")</li>
      <li>Settings: ⚙️</li>
    </ul>
    <div class="fai-section-title">Mobile</div>
    <ul>
      <li>Use on-screen joystick</li>
      <li>Tap buttons to act, hold 🎤 to speak</li>
    </ul>
  `;

  const closeEl = panel.querySelector(".fai-help-close");
  const toggle = () => {
    panel.classList.toggle("hidden");
  };
  const show = () => panel.classList.remove("hidden");
  const hide = () => panel.classList.add("hidden");
  const destroy = () => {
    btn.remove();
    panel.remove();
  };

  btn.addEventListener("click", toggle, { passive: true });
  closeEl.addEventListener("click", hide, { passive: true });

  // Insert into DOM
  document.body.appendChild(btn);
  document.body.appendChild(panel);

  return { show, hide, toggle, destroy };
}
