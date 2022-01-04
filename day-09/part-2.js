/*
What do you get if you multiply together the sizes of the three largest basins?
*/

import readFile from '../read-file.js';

const map = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  map.push(line.split('').map(Number));
});

function getCell(x, y) {
  if (!map[x]) return undefined;
  return map[x][y];
}

function findLowPoint(x, y) {
  const cell = getCell(x, y);

  if (getCell(x - 1, y) < cell) {
    return findLowPoint(x - 1, y);
  }
  if (getCell(x + 1, y) < cell) {
    return findLowPoint(x + 1, y);
  }
  if (getCell(x, y - 1) < cell) {
    return findLowPoint(x, y - 1);
  }
  if (getCell(x, y + 1) < cell) {
    return findLowPoint(x, y + 1);
  }

  return [x, y];
}

function pointString([x, y]) {
  return `${x},${y}`;
}

const lowPoints = new Map();
for (let x = 0; x < map.length; x += 1) {
  for (let y = 0; y < map[x].length; y += 1) {
    const cell = getCell(x, y);

    if (cell === 9) {
      // ignore
    } else {
      const lowPoint = findLowPoint(x, y);
      lowPoints.set(
        pointString(lowPoint),
        (lowPoints.get(pointString(lowPoint)) ?? 0) + 1
      );
    }
  }
}

const multiply = (a, b) => a * b;

const result = [...lowPoints]
  .map(([, size]) => size)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(multiply);

console.log(result);
