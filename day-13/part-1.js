/*
How many dots are visible after completing just the first fold instruction on
your transparent paper?
*/

import readFile from '../read-file.js';

const points = [];
const folds = [];
{
  let readingFolds = false;
  await readFile(new URL('./input.txt', import.meta.url), (line) => {
    if (line.length === 0) {
      readingFolds = true;
    } else if (readingFolds) {
      const [direction, coordinate] = line.slice(11).split('=');
      folds.push({ direction, coordinate: Number(coordinate) });
    } else {
      const [x, y] = line.split(',').map(Number);
      points.push({ x, y });
    }
  });
}

const { direction, coordinate } = folds[0];
for (const point of points) {
  if (point[direction] > coordinate) {
    point[direction] = 2 * coordinate - point[direction];
  }
}

const result = new Set(points.map(({ x, y }) => `${x},${y}`)).size;
console.log(result);
