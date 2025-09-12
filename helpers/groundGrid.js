export function createGroundGrid(THREE, scene, {
  size = 400,
  divisions = 80,
  colorCenterLine = 0x888888,
  colorGrid = 0x444444,
  y = 0
} = {}) {
  if (!THREE || !scene) return null;

  const grid = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
  grid.position.y = y;
  if (grid.material) {
    grid.material.transparent = true;
    grid.material.opacity = 0.35;
    // @ts-ignore - material on GridHelper is usually LineBasicMaterial
    if (grid.material.depthWrite !== undefined) grid.material.depthWrite = false;
  }
  grid.renderOrder = -1;
  scene.add(grid);
  return grid;
}
