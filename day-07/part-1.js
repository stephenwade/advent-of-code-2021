/*
Determine the horizontal position that the crabs can align to using the least
fuel possible. How much fuel must they spend to align to that position?
*/

import readFile from '../read-file.js';

let crabPositions;
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  crabPositions = line.split(',').map(Number);
});

const add = (a, b) => a + b;

function calculateFuelRequired(position) {
  return crabPositions.map((p) => Math.abs(p - position)).reduce(add);
}

let minFuelRequired = calculateFuelRequired(crabPositions[0]);
const [min, max] = [Math.min(...crabPositions), Math.max(...crabPositions)];
for (let position = min; position <= max; position += 1) {
  const fuelRequired = calculateFuelRequired(position);
  if (fuelRequired < minFuelRequired) minFuelRequired = fuelRequired;
}

console.log(minFuelRequired);
