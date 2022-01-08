/*
Apply 40 steps of pair insertion to the polymer template and find the most and
least common elements in the result. What do you get if you take the quantity of
the most common element and subtract the quantity of the least common element?
*/

import readFile from '../read-file.js';

let template;
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
      template = line;
    }
  });
}

const pairs = new Map();
for (let i = 0; i < template.length - 1; i += 1) {
  const pair = template.slice(i, i + 2);
  pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
}

function step() {
  const changes = [];

  for (const { pair, letter } of rules) {
    const count = pairs.get(pair);
    if (count) {
      changes.push({ pair, change: -count });

      const [a, b] = pair;
      changes.push({ pair: `${a}${letter}`, change: count });
      changes.push({ pair: `${letter}${b}`, change: count });
    }
  }

  for (const { pair, change } of changes) {
    pairs.set(pair, (pairs.get(pair) ?? 0) + change);
  }
}

for (let i = 0; i < 40; i += 1) step();

const elements = new Map();
for (const [[a, b], count] of pairs) {
  elements.set(a, (elements.get(a) ?? 0) + count);
  elements.set(b, (elements.get(b) ?? 0) + count);
}
const [first, last] = [template[0], template[template.length - 1]];
elements.set(first, (elements.get(first) ?? 0) + 1);
elements.set(last, (elements.get(last) ?? 0) + 1);
for (const [letter, count] of elements) {
  elements.set(letter, count / 2);
}

const mostCommonQty = Math.max(...elements.values());
const leastCommonQty = Math.min(...elements.values());
console.log(mostCommonQty - leastCommonQty);
