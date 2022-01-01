/*
Each bit in the gamma rate can be determined by finding the most common bit in
the corresponding position of all numbers in the diagnostic report.

The epsilon rate is calculated in a similar way; rather than use the most common
bit, the least common bit from each position is used.

Use the binary numbers in your diagnostic report to calculate the gamma rate and
epsilon rate, then multiply them together. What is the power consumption of the
submarine? (Be sure to represent your answer in decimal, not binary.)
*/

import readFile from '../read-file.js';

const diagnostics = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  diagnostics.push(line);
});

const bitCounts = [];
for (let i = 0; i < diagnostics[0].length; i += 1) {
  bitCounts.push({ 0: 0, 1: 0 });
}

for (const diagnostic of diagnostics) {
  for (let i = 0; i < diagnostic.length; i += 1) {
    const char = diagnostic[i];
    bitCounts[i][char] += 1;
  }
}

let gammaRate = '';
let epsilonRate = '';
for (const counts of bitCounts) {
  if (counts['0'] > counts['1']) {
    gammaRate += '0';
    epsilonRate += '1';
  } else {
    gammaRate += '1';
    epsilonRate += '0';
  }
}

const result = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
console.log(result);
