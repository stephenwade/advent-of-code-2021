/*
Consider all of the lines. At how many points do at least two lines overlap?
*/

import readFile from '../read-file.js';

import Line from './line.js';

const lines = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  lines.push(new Line(line));
});

const allPoints = new Map();
for (const line of lines) {
  for (const point of line.points()) {
    allPoints.set(point, (allPoints.get(point) ?? 0) + 1);
  }
}

console.log([...allPoints.values()].filter((v) => v >= 2).length);
