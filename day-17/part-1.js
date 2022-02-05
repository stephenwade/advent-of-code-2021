/*
Find the initial velocity that causes the probe to reach the highest y position
and still eventually be within the target area after any step. What is the
highest y position it reaches on this trajectory?
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
 * after any step, returns the highest Y position reached on the trajectory.
 * Otherwise, returns `undefined`.
 */
function getHighestY(vxin, vyin) {
  let vx = vxin;
  let vy = vyin;
  let x = 0;
  let y = 0;
  let highestY = 0;

  let check;
  while (check !== false) {
    x += vx;
    y += vy;
    highestY = Math.max(y, highestY);
    vx -= Math.sign(vx);
    vy -= 1;

    check = checkTargetPosition(x, y);

    if (check === true) {
      return highestY;
    }
  }

  return undefined;
}

let highestY = 0;
for (let vx = 0; vx <= 1000; vx += 1) {
  for (let vy = -1000; vy <= 1000; vy += 1) {
    const result = getHighestY(vx, vy);
    if (result !== undefined) highestY = Math.max(result, highestY);
  }
}

console.log(highestY);
