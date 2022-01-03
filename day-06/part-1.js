/*
How many lanternfish would there be after 80 days?
*/

import readFile from '../read-file.js';

let fish;
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  fish = line.split(',').map(Number);
});

for (let i = 0; i < 80; i += 1) {
  const startingLength = fish.length;
  for (let f = 0; f < startingLength; f += 1) {
    if (fish[f] === 0) {
      fish[f] = 6;
      fish.push(8);
    } else {
      fish[f] -= 1;
    }
  }
}

console.log(fish.length);
