/*
Finish folding the transparent paper according to the instructions. The manual
says the code is always eight capital letters.

What code do you use to activate the infrared thermal imaging camera system?
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

for (const { direction, coordinate } of folds) {
  for (const point of points) {
    if (point[direction] > coordinate) {
      point[direction] = 2 * coordinate - point[direction];
    }
  }
}

const maxX = Math.max(...points.map(({ x }) => x));
const maxY = Math.max(...points.map(({ y }) => y));
const display = new Array(maxY + 1);
for (let i = 0; i < maxY + 1; i += 1) {
  display[i] = new Array(maxX + 1).fill('  ');
}

for (const { x, y } of points) {
  display[y][x] = '##';
}

for (const line of display) {
  console.log(line.join(''));
}
