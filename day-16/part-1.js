/*
Decode the structure of your hexadecimal-encoded BITS transmission; what do you
get if you add up the version numbers in all packets?
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
    return { version, type: 'operator', subPackets, sc };
  }

  const numberOfSubPackets = btod(s.slice(sc, (sc += 11)));
  const subPackets = [];
  while (subPackets.length < numberOfSubPackets) {
    const subPacket = decodePacket(s.slice(sc));
    sc += subPacket.sc;
    subPackets.push(subPacket);
  }
  return { version, type: 'operator', subPackets, sc };
}

function sumVersions(packet) {
  const { version, subPackets } = packet;

  let total = version;

  if (subPackets) {
    for (const p of subPackets) {
      total += sumVersions(p);
    }
  }

  return total;
}

const packet = decodePacket(transmission);
console.log(sumVersions(packet));
