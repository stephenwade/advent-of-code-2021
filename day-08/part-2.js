/*
For each entry, determine all of the wire/segment connections and decode the
four-digit output values. What do you get if you add up all of the output
values?
*/

import readFile from '../read-file.js';

const segments = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [signalPatterns, outputValue] = line.split(' | ');
  segments.push({
    signalPatterns: signalPatterns.split(' ').map((p) => new Set(p)),
    outputValue: outputValue.split(' ').map((v) => new Set(v)),
  });
});

function setContains(a, b) {
  return Array.from(b).every((x) => a.has(x));
}

function setEquals(a, b) {
  if (a.size !== b.size) return false;

  return setContains(a, b);
}

function decodeSegment(segment) {
  const { signalPatterns, outputValue } = segment;

  const digits = Array(10);

  digits[1] = signalPatterns.find((p) => p.size === 2);
  digits[7] = signalPatterns.find((p) => p.size === 3);
  digits[4] = signalPatterns.find((p) => p.size === 4);
  digits[8] = signalPatterns.find((p) => p.size === 7);

  digits[9] = signalPatterns.find(
    (p) => p.size === 6 && setContains(p, digits[4])
  );
  digits[0] = signalPatterns.find(
    (p) =>
      p.size === 6 && !setContains(p, digits[4]) && setContains(p, digits[1])
  );
  digits[6] = signalPatterns.find(
    (p) =>
      p.size === 6 && !setContains(p, digits[4]) && !setContains(p, digits[1])
  );

  digits[5] = signalPatterns.find(
    (p) => p.size === 5 && setContains(digits[6], p)
  );
  digits[3] = signalPatterns.find(
    (p) =>
      p.size === 5 && !setContains(digits[6], p) && setContains(p, digits[1])
  );
  digits[2] = signalPatterns.find(
    (p) =>
      p.size === 5 && !setContains(digits[6], p) && !setContains(p, digits[1])
  );

  const result = Number(
    outputValue
      .map((v) => digits.findIndex((d) => setEquals(d, v)))
      .map(String)
      .join('')
  );
  return result;
}

const add = (a, b) => a + b;

const result = segments.map(decodeSegment).reduce(add);
console.log(result);
