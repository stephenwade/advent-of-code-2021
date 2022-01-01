/*
Next, you should verify the life support rating, which can be determined by
multiplying the oxygen generator rating by the CO2 scrubber rating.

Both the oxygen generator rating and the CO2 scrubber rating are located using
a similar process that involves filtering out values until only one remains.
Before searching for either rating value, start with the full list of binary
numbers from your diagnostic report and consider just the first bit of those
numbers. Then:

- Keep only numbers selected by the bit criteria for the type of rating value
  for which you are searching. Discard numbers which do not match the bit
  criteria.
- If you only have one number left, stop; this is the rating value for which
  you are searching.
- Otherwise, repeat the process, considering the next bit to the right.

The bit criteria depends on which type of rating value you want to find:

- To find oxygen generator rating, determine the most common value (0 or 1)
  in the current bit position, and keep only numbers with that bit in that
  position. If 0 and 1 are equally common, keep values with a 1 in the position
  being considered.
- To find CO2 scrubber rating, determine the least common value (0 or 1)
  in the current bit position, and keep only numbers with that bit in that
  position. If 0 and 1 are equally common, keep values with a 0 in the position
  being considered.

What is the life support rating of the submarine? (Be sure to represent your
answer in decimal, not binary.)
*/

import readFile from '../read-file.js';

const diagnostics = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  diagnostics.push(line);
});

function bitCounts(diags) {
  const result = [];
  for (let i = 0; i < diags[0].length; i += 1) {
    result.push({ 0: 0, 1: 0 });
  }

  for (const diagnostic of diags) {
    for (let i = 0; i < diagnostic.length; i += 1) {
      const char = diagnostic[i];
      result[i][char] += 1;
    }
  }

  return result;
}

let oxygenDiagnostics = diagnostics;
let oxygenCounter = 0;
while (oxygenDiagnostics.length > 1) {
  const counts = bitCounts(oxygenDiagnostics);
  let predicateDigit;
  if (counts[oxygenCounter]['0'] > counts[oxygenCounter]['1']) {
    predicateDigit = '0';
  } else {
    predicateDigit = '1';
  }
  oxygenDiagnostics = oxygenDiagnostics.filter(
    // eslint-disable-next-line no-loop-func
    (d) => d[oxygenCounter] === predicateDigit
  );
  oxygenCounter += 1;
}

let co2Diagnostics = diagnostics;
let co2Counter = 0;
while (co2Diagnostics.length > 1) {
  const counts = bitCounts(co2Diagnostics);
  let predicateDigit;
  if (counts[co2Counter]['0'] <= counts[co2Counter]['1']) {
    predicateDigit = '0';
  } else {
    predicateDigit = '1';
  }
  co2Diagnostics = co2Diagnostics.filter(
    // eslint-disable-next-line no-loop-func
    (d) => d[co2Counter] === predicateDigit
  );
  co2Counter += 1;
}

const oxygenGeneratorRating = parseInt(oxygenDiagnostics[0], 2);
const co2ScrubberRating = parseInt(co2Diagnostics[0], 2);

console.log(oxygenGeneratorRating * co2ScrubberRating);
