export function createFullscreenButton(targetEl) {
  if (typeof document === "undefined") return null;

  const container = document.getElementById('action-buttons') || document.body;

  // Avoid duplicates
  let btn = document.getElementById('fullscreen-button');
  if (btn) return btn;

  btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'fullscreen-button';
  btn.className = 'action-button fai-fullscreen-btn';

  const isFs = () =>
    !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);

  const updateLabel = () => {
    btn.textContent = isFs() ? 'Exit Fullscreen' : 'Fullscreen';
  };

  const pickTarget = () => {
    if (targetEl && targetEl.ownerDocument) return targetEl;
    const canvas =
      document.querySelector('#game-container canvas') ||
      document.querySelector('canvas');
    return canvas || document.documentElement;
  };

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const el = pickTarget();
    const elForRequest = el.parentElement || el;
    try {
      if (!isFs()) {
        if (elForRequest.requestFullscreen) await elForRequest.requestFullscreen();
        else if (elForRequest.webkitRequestFullscreen) elForRequest.webkitRequestFullscreen();
        else if (elForRequest.msRequestFullscreen) elForRequest.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    } finally {
      updateLabel();
    }
  });

  document.addEventListener('fullscreenchange', updateLabel);
  document.addEventListener('webkitfullscreenchange', updateLabel);
  document.addEventListener('MSFullscreenChange', updateLabel);

  updateLabel();
  container.appendChild(btn);
  return btn;
}
