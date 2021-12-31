/*
Calculate the horizontal position and depth you would have after following the
planned course. What do you get if you multiply your final horizontal position
by your final depth?
*/

import readFile from '../read-file.js';

function parseInstruction(instruction) {
  const [direction, numberStr] = instruction.split(' ');
  return { direction, number: Number(numberStr) };
}

const commands = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  commands.push(parseInstruction(line));
});

let x = 0;
let depth = 0;
for (const command of commands) {
  const { direction, number } = command;
  if (direction === 'forward') x += number;
  if (direction === 'up') depth -= number;
  if (direction === 'down') depth += number;
}

console.log(x * depth);
