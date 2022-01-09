/*
What do you get if you evaluate the expression represented by your
hexadecimal-encoded BITS transmission?
*/

import readFile from '../read-file.js';

let transmission;
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  transmission = line
    .split('')
    .map((x) => parseInt(x, 16).toString(2).padStart(4, '0'))
    .join('');
});

function btod(str) {
  return parseInt(str, 2);
}

function decodePacket(s) {
  const version = btod(s.slice(0, 3));
  const typeId = btod(s.slice(3, 6));

  let sc = 6; // string counter

  if (typeId === 4) {
    let valueString = '';
    let lastPrefix;
    do {
      lastPrefix = s[sc];
      valueString += s.slice(sc + 1, sc + 5);
      sc += 5;
    } while (lastPrefix === '1');

    return { version, type: 'literal', value: btod(valueString), sc };
  }

  let type;
  if (typeId === 0) type = 'sum';
  if (typeId === 1) type = 'product';
  if (typeId === 2) type = 'minimum';
  if (typeId === 3) type = 'maximum';
  if (typeId === 5) type = 'greater than';
  if (typeId === 6) type = 'less than';
  if (typeId === 7) type = 'equal to';

  const lengthTypeId = s[sc];
  sc += 1;

  if (lengthTypeId === '0') {
    const totalLengthOfSubPackets = btod(s.slice(sc, (sc += 15)));
    const subPackets = [];
    const targetSc = sc + totalLengthOfSubPackets;
    while (sc < targetSc) {
      const subPacket = decodePacket(s.slice(sc));
      sc += subPacket.sc;
      subPackets.push(subPacket);
    }
    return { version, type, subPackets, sc };
  }

  const numberOfSubPackets = btod(s.slice(sc, (sc += 11)));
  const subPackets = [];
  while (subPackets.length < numberOfSubPackets) {
    const subPacket = decodePacket(s.slice(sc));
    sc += subPacket.sc;
    subPackets.push(subPacket);
  }
  return { version, type, subPackets, sc };
}

function evaluate(packet) {
  const { type, value, subPackets } = packet;

  if (type === 'sum') {
    if (subPackets.length === 1) {
      return evaluate(subPackets[0]);
    }

    const add = (a, b) => a + b;
    return subPackets.map(evaluate).reduce(add);
  }

  if (type === 'product') {
    if (subPackets.length === 1) {
      return evaluate(subPackets[0]);
    }

    const multiply = (a, b) => a * b;
    return subPackets.map(evaluate).reduce(multiply);
  }

  if (type === 'minimum') {
    return Math.min(...subPackets.map(evaluate));
  }

  if (type === 'maximum') {
    return Math.max(...subPackets.map(evaluate));
  }

  if (type === 'greater than') {
    const [a, b] = subPackets.map(evaluate);
    return a > b ? 1 : 0;
  }

  if (type === 'less than') {
    const [a, b] = subPackets.map(evaluate);
    return a < b ? 1 : 0;
  }

  if (type === 'equal to') {
    const [a, b] = subPackets.map(evaluate);
    return a === b ? 1 : 0;
  }

  return value;
}

const packet = decodePacket(transmission);
console.log(evaluate(packet));
