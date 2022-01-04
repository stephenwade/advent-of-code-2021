/*
Find all of the low points on your heightmap. What is the sum of the risk levels
of all low points on your heightmap?
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

let totalRisk = 0;
for (let x = 0; x < map.length; x += 1) {
  for (let y = 0; y < map[x].length; y += 1) {
    const cell = getCell(x, y);

    const isLowestPoint = [
      getCell(x - 1, y),
      getCell(x + 1, y),
      getCell(x, y - 1),
      getCell(x, y + 1),
    ].every((c) => c === undefined || c > cell);

    if (isLowestPoint) totalRisk += cell + 1;
  }
}

console.log(totalRisk);
