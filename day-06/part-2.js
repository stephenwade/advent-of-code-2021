/*
How many lanternfish would there be after 256 days?
*/

import readFile from '../read-file.js';

const fish = Array(9).fill(0);
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const ages = line.split(',').map(Number);
  for (const age of ages) {
    fish[age] += 1;
  }
});

for (let i = 0; i < 256; i += 1) {
  const zeros = fish.shift();
  fish.push(zeros);
  fish[6] += zeros;
}

const add = (a, b) => a + b;

console.log(fish.reduce(add));
