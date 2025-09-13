export function createDayNightToggle({ scene, ambientLight, dirLight, containerId = 'action-buttons' } = {}) {
  if (typeof document === 'undefined') return null;

  // Inject scoped styles once
  const styleId = 'fai-daynight-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .fai-daynight-btn{user-select:none;touch-action:manipulation;margin-left:6px}
      .fai-daynight-btn:focus{outline:none}
    `;
    document.head.appendChild(style);
  }

  // Avoid duplicate button
  const existing = document.getElementById('daynight-button');
  if (existing) return existing;

  const container = document.getElementById(containerId) || document.body;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'daynight-button';
  btn.className = 'action-button fai-daynight-btn';
  btn.title = 'Toggle Day/Night';
  btn.textContent = '🌗';
  container.appendChild(btn);

  // Initial state uses current scene setup as "day"
  let isNight = false;

  const applyMode = (night) => {
    if (scene && scene.background && typeof scene.background.set === 'function') {
      scene.background.set(night ? 0x0b0d1a : 0x87ceeb);
    }

    if (ambientLight) ambientLight.intensity = night ? 0.2 : 0.5;
    if (dirLight) {
      dirLight.intensity = night ? 0.5 : 1.0;
      if (dirLight.color && typeof dirLight.color.setHex === 'function') {
        dirLight.color.setHex(night ? 0x9bbcff : 0xffffff);
      }
    }
  };

  btn.addEventListener('click', () => {
    isNight = !isNight;
    applyMode(isNight);
  });

  return btn;
}
