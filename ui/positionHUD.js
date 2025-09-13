/**
 * Lightweight, scoped HUD to display player XYZ and heading.
 * No side effects on import; DOM is created only when this function is called.
 */
export function createPositionHUD() {
  // Scoped styles
  const style = document.createElement('style');
  style.textContent = `
    .fa-pos-hud {
      position: fixed;
      left: 10px;
      bottom: 10px;
      padding: 6px 8px;
      background: rgba(0, 0, 0, 0.45);
      color: #e0ffe0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      font-size: 11px;
      line-height: 1.2;
      border: 1px solid rgba(0, 0, 0, 0.6);
      border-radius: 6px;
      pointer-events: none;
      user-select: none;
      z-index: 11;
      text-shadow: 0 1px 0 rgba(0,0,0,0.4);
    }
    .fa-pos-hud .label { opacity: 0.7; }
  `;
  document.head.appendChild(style);

  // HUD element
  const root = document.createElement('div');
  root.className = 'fa-pos-hud';
  root.setAttribute('aria-hidden', 'true');
  root.textContent = 'XYZ 0.0, 0.0, 0.0 | 0°';
  document.body.appendChild(root);

  const fmt = (n) => {
    if (!Number.isFinite(n)) return '0.0';
    const abs = Math.abs(n);
    return (abs < 1000 ? n.toFixed(1) : n.toFixed(0));
  };

  return {
    update(position, headingDeg) {
      if (!position) return;
      const x = fmt(position.x);
      const y = fmt(position.y);
      const z = fmt(position.z);
      const h = Math.round(((headingDeg % 360) + 360) % 360);
      root.textContent = `XYZ ${x}, ${y}, ${z} | ${h}°`;
    }
  };
}
