/*
How many measurements are larger than the previous measurement?
*/

import readFile from '../read-file.js';

const measurements = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  measurements.push(Number(line));
});

let previous = measurements[0];
let result = 0;
for (const num of measurements.slice(1)) {
  if (num > previous) result += 1;
  previous = num;
}

console.log(result);
