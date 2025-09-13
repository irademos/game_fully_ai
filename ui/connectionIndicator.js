export function createConnectionIndicator({ container = document.body } = {}) {
  if (typeof document === "undefined") {
    return { setStatus() {}, destroy() {} };
  }

  const styleId = "fai-conn-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
.fai-conn-indicator {
  position: fixed;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: rgba(0,0,0,0.55);
  color: #e0e0e0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 1;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  z-index: 10000;
  pointer-events: none;
}
.fai-conn-indicator__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #888;
  box-shadow: 0 0 8px rgba(0,0,0,0.25);
  flex: 0 0 auto;
}
.fai-conn-indicator__text {
  white-space: nowrap;
  opacity: 0.95;
}
    `;
    document.head.appendChild(style);
  }

  const root = document.createElement("div");
  root.className = "fai-conn-indicator";
  root.setAttribute("aria-live", "polite");
  const dot = document.createElement("div");
  dot.className = "fai-conn-indicator__dot";
  const text = document.createElement("div");
  text.className = "fai-conn-indicator__text";
  text.textContent = "Peers: 0 • Ping: -";

  root.appendChild(dot);
  root.appendChild(text);
  (container || document.body).appendChild(root);

  function setStatus({ peers = 0, avgPing = null } = {}) {
    const pingStr = (avgPing == null || Number.isNaN(avgPing)) ? "-" : `${avgPing}`;
    text.textContent = `Peers: ${peers} • Ping: ${pingStr}`;
    let color = "#888";
    if (peers > 0) {
      if (avgPing == null) {
        color = "#4ea1ff";
      } else if (avgPing < 120) {
        color = "#2ecc71";
      } else if (avgPing < 250) {
        color = "#f1c40f";
      } else {
        color = "#e74c3c";
      }
    }
    dot.style.background = color;
    dot.style.boxShadow = `0 0 10px ${color}55`;
  }

  function destroy() {
    root.remove();
  }

  setStatus({ peers: 0, avgPing: null });

  return { setStatus, destroy };
}
