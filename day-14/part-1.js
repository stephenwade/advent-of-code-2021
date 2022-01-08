/*
Apply 10 steps of pair insertion to the polymer template and find the most and
least common elements in the result. What do you get if you take the quantity of
the most common element and subtract the quantity of the least common element?
*/

import readFile from '../read-file.js';

let polymer;
const rules = [];
{
  let readingRules = false;
  await readFile(new URL('./input.txt', import.meta.url), (line) => {
    if (line.length === 0) {
      readingRules = true;
    } else if (readingRules) {
      const [pair, letter] = line.split(' -> ');
      rules.push({ pair, letter });
    } else {
      polymer = line.split('');
    }
  });
}

function step() {
  for (let i = polymer.length - 2; i >= 0; i -= 1) {
    const [a, b] = polymer.slice(i, i + 2);
    for (const { pair, letter } of rules) {
      if (pair[0] === a && pair[1] === b) {
        polymer.splice(i + 1, 0, letter);
      }
    }
  }
}

for (let i = 0; i < 10; i += 1) step();

const elements = new Map();
for (const letter of polymer) {
  elements.set(letter, (elements.get(letter) ?? 0) + 1);
}

const mostCommonQty = Math.max(...elements.values());
const leastCommonQty = Math.min(...elements.values());
console.log(mostCommonQty - leastCommonQty);
