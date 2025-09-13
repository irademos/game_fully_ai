export function createCompassHUD() {
  if (typeof document === "undefined") {
    return { setHeading() {}, destroy() {} };
  }

  const styleId = "fai-compass-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
.fai-compass{position:fixed;top:8px;left:50%;transform:translateX(-50%);width:86px;pointer-events:none;z-index:1000;font-family:'Press Start 2P',system-ui,monospace}
.fai-compass__dial{width:86px;height:86px;border-radius:50%;background:rgba(0,0,0,0.55);backdrop-filter:blur(2px);border:1px solid rgba(255,255,255,0.25);position:relative;box-shadow:0 2px 6px rgba(0,0,0,0.3)}
.fai-compass__tick{position:absolute;left:50%;top:6px;transform:translateX(-50%);width:2px;height:10px;background:#fff;border-radius:1px;opacity:.9}
.fai-compass__needle{position:absolute;left:50%;top:14px;transform-origin:50% 29px;transform:translateX(-50%) rotate(0deg);width:2px;height:58px;background:linear-gradient(#ff5252,#ff8a80);border-radius:2px;box-shadow:0 0 6px rgba(255,80,80,.8)}
.fai-compass__label{margin-top:4px;text-align:center;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.6);font-size:10px;letter-spacing:1px}
.fai-compass__cardinals{position:absolute;inset:0;color:#cfe8ff;font-size:9px;opacity:.8}
.fai-compass__cardinals span{position:absolute}
.fai-compass__cardinals .n{top:2px;left:50%;transform:translateX(-50%)}
.fai-compass__cardinals .e{top:50%;right:6px;transform:translateY(-50%)}
.fai-compass__cardinals .s{bottom:2px;left:50%;transform:translateX(-50%)}
.fai-compass__cardinals .w{top:50%;left:6px;transform:translateY(-50%)}
`;
    document.head.appendChild(style);
  }

  let container = document.getElementById("fai-compass");
  if (!container) {
    container = document.createElement("div");
    container.id = "fai-compass";
    container.className = "fai-compass";

    const dial = document.createElement("div");
    dial.className = "fai-compass__dial";

    const tick = document.createElement("div");
    tick.className = "fai-compass__tick";
    dial.appendChild(tick);

    const cardinals = document.createElement("div");
    cardinals.className = "fai-compass__cardinals";
    cardinals.innerHTML = `
      <span class="n">N</span>
      <span class="e">E</span>
      <span class="s">S</span>
      <span class="w">W</span>
    `;
    dial.appendChild(cardinals);

    const needle = document.createElement("div");
    needle.className = "fai-compass__needle";
    dial.appendChild(needle);

    const label = document.createElement("div");
    label.className = "fai-compass__label";
    label.textContent = "N 0°";

    container.appendChild(dial);
    container.appendChild(label);
    document.body.appendChild(container);
  }

  const needleEl = container.querySelector(".fai-compass__needle");
  const labelEl = container.querySelector(".fai-compass__label");

  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  function setHeading(deg) {
    const d = ((deg % 360) + 360) % 360;
    if (needleEl) {
      needleEl.style.transform = `translateX(-50%) rotate(${d}deg)`;
    }
    if (labelEl) {
      const idx = Math.round(d / 45) % 8;
      labelEl.textContent = `${dirs[idx]} ${Math.round(d)}°`;
    }
  }

  function destroy() {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  return { setHeading, destroy };
}
