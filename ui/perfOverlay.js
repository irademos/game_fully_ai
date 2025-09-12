/**
 * Lightweight, side-effect-free FPS overlay.
 * Call createPerfOverlay() once after scene/renderer are ready.
 */
export function createPerfOverlay() {
  // Scoped styles
  const style = document.createElement("style");
  style.textContent = `
.perf-overlay{position:fixed;bottom:8px;right:8px;background:rgba(0,0,0,0.65);color:#0f0;font-family:monospace;font-size:12px;line-height:1;padding:6px 8px;border-radius:6px;z-index:99999;pointer-events:none;user-select:none;box-shadow:0 2px 6px rgba(0,0,0,0.3)}
.perf-overlay__value{font-weight:bold}
`;
  document.head.appendChild(style);

  // UI element
  const el = document.createElement("div");
  el.className = "perf-overlay";
  el.setAttribute("aria-hidden", "true");
  el.textContent = "FPS —";
  document.body.appendChild(el);

  // Measurement state
  let last = performance.now();
  let acc = 0;
  let frames = 0;

  function onFrame() {
    const now = performance.now();
    const dt = now - last;
    last = now;
    acc += dt;
    frames += 1;

    // Update text ~2 times per second for stability
    if (acc >= 500) {
      const fps = (frames * 1000) / acc;
      const ms = acc / frames;
      el.textContent = `FPS ${fps.toFixed(0)} | ${ms.toFixed(1)}ms`;
      acc = 0;
      frames = 0;
    }
  }

  function destroy() {
    if (el.parentNode) el.parentNode.removeChild(el);
    if (style.parentNode) style.parentNode.removeChild(style);
  }

  return { onFrame, destroy, element: el };
}
