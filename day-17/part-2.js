/*
How many distinct initial velocity values cause the probe to be within the
target area after any step?
*/

import readFile from '../read-file.js';

let targetArea;
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [x, y] = line
    .substring(13)
    .split(', ')
    .map((s) => {
      const [min, max] = s.substring(2).split('..').map(Number);
      return { min, max };
    });
  targetArea = { x, y };
});

/**
 * - Returns `true` if the position is within the target area.
 * - Returns `false` if the position could never reach the target area.
 * - Returns `undefined` if the position is not within the target area, but
 *   could reach the target area after another step.
 */
function checkTargetPosition(x, y) {
  if (
    x >= targetArea.x.min &&
    x <= targetArea.x.max &&
    y >= targetArea.y.min &&
    y <= targetArea.y.max
  ) {
    return true;
  }

  if (x > targetArea.x.max || y < targetArea.y.min) {
    return false;
  }

  return undefined;
}

/**
 * If the trajectory described by `[vx, vy]` is within the target area
 * after any step, returns `true`. Otherwise, returns `false`.
 */
function getMeetsTarget(vxin, vyin) {
  let vx = vxin;
  let vy = vyin;
  let x = 0;
  let y = 0;

  let check;
  while (check !== false) {
    x += vx;
    y += vy;
    vx -= Math.sign(vx);
    vy -= 1;

    check = checkTargetPosition(x, y);

    if (check === true) {
      return true;
    }
  }

  return false;
}

let total = 0;
for (let vx = 0; vx <= 1000; vx += 1) {
  for (let vy = -1000; vy <= 1000; vy += 1) {
    if (getMeetsTarget(vx, vy)) total += 1;
  }
}

console.log(total);
