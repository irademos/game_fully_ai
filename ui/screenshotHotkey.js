/**
 * Adds a global K hotkey to download a PNG screenshot of the current WebGL canvas.
 * No side effects on import; call initScreenshotHotkey(renderer) once after renderer is ready.
 */
export function initScreenshotHotkey(renderer) {
  if (!renderer || renderer.__screenshotHotkeyInitialized) return;

  const handler = (e) => {
    if (e.code !== "KeyK") return;

    const ae = document.activeElement;
    const tag = (ae?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || ae?.isContentEditable) return;

    try {
      const dataURL = renderer.domElement.toDataURL("image/png");
      const link = document.createElement("a");
      const ts = new Date().toISOString().replace(/[:.]/g, "-");
      link.href = dataURL;
      link.download = `screenshot-${ts}.png`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 0);
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  window.addEventListener("keydown", handler);
  renderer.__screenshotHotkeyInitialized = true;
}
