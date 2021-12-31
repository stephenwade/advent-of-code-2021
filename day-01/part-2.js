/*
Consider sums of a three-measurement sliding window. How many sums are larger
than the previous sum?
*/

import readFile from '../read-file.js';

const measurements = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  measurements.push(Number(line));
});

function* getWindows() {
  for (let i = 2; i < measurements.length; i += 1) {
    yield [measurements[i - 2], measurements[i - 1], measurements[i]];
  }
}

const windows = getWindows();

const add = (a, b) => a + b;

let previousSum = windows.next().value.reduce(add);
let result = 0;
for (const window of windows) {
  const sum = window.reduce(add);
  if (sum > previousSum) result += 1;
  previousSum = sum;
}

console.log(result);
