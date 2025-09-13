/**
 * Creates a screenshot button in the #action-buttons container.
 * Clicking the button downloads a PNG of the current frame.
 * No side effects on import; call this once after renderer is ready.
 */
export function createScreenshotButton(renderer) {
  const existing = document.getElementById('screenshot-button');
  if (existing) return existing;

  const container = document.getElementById('action-buttons') || document.body;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'screenshot-button';
  btn.className = 'action-button screenshot-button';
  btn.title = 'Save screenshot';
  btn.textContent = '📸';

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    try {
      const dataURL = renderer.domElement.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      a.download = `screenshot-${ts}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Screenshot failed:', err);
    } finally {
      btn.blur();
    }
  });

  container.appendChild(btn);
  return btn;
}
