/*
In the output values, how many times do digits 1, 4, 7, or 8 appear?
*/

import readFile from '../read-file.js';

const outputValues = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [, outputValue] = line.split(' | ');
  outputValues.push(outputValue.split(' '));
});

const result = outputValues
  .flat()
  .filter(
    (v) => v.length === 2 || v.length === 3 || v.length === 4 || v.length === 7
  ).length;

console.log(result);
