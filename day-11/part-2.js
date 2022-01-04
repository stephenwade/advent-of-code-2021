/*
What is the first step during which all octopuses flash?
*/

import readFile from '../read-file.js';

function createOctopus(input) {
  return {
    energy: Number(input),
    flashed: false,
  };
}

const octopuses = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  octopuses.push(line.split('').map(createOctopus));
});

function getOctopus(x, y) {
  return octopuses[x]?.[y];
}

function getNeighbors(x, y) {
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ]
    .map(([x_, y_]) => getOctopus(x_, y_))
    .filter((o) => o);
}

function step() {
  /* 
  First, the energy level of each octopus increases by 1.
  */
  for (const row of octopuses) {
    for (const octopus of row) {
      octopus.energy += 1;
    }
  }

  /*
  Then, any octopus with an energy level greater than 9 flashes. This increases
  the energy level of all adjacent octopuses by 1, including octopuses that are
  diagonally adjacent. If this causes an octopus to have an energy level greater
  than 9, it also flashes. This process continues as long as new octopuses keep
  having their energy level increased beyond 9. (An octopus can only flash at 
  most once per step.)
  */
  while (octopuses.flat().some((o) => o.energy > 9 && !o.flashed)) {
    for (let x = 0; x < octopuses.length; x += 1) {
      for (let y = 0; y < octopuses[x].length; y += 1) {
        const octopus = getOctopus(x, y);

        if (octopus.energy > 9 && !octopus.flashed) {
          octopus.flashed = true;

          for (const neighbor of getNeighbors(x, y)) {
            neighbor.energy += 1;
          }
        }
      }
    }
  }

  /*
  Finally, any octopus that flashed during this step has its energy level set to
  0, as it used all of its energy to flash.
  */
  for (const octopus of octopuses.flat().filter((o) => o.energy > 9)) {
    octopus.energy = 0;
    octopus.flashed = false;
  }
}

let i;
for (i = 0; octopuses.flat().some((o) => o.energy !== 0); i += 1) step();

console.log(i);
