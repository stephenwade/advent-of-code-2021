/*
Using the full map, what is the lowest total risk of any path from the top left
to the bottom right?
*/

import readFile from '../read-file.js';

import findPath from './dijkstra.js';

const mapFragment = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const tileLine = line.split('').map(Number);
  mapFragment.push(
    Array.from({ length: 5 }, (_, i) =>
      tileLine.map((x) => {
        const v = x + i;
        if (v > 9) return v - 9;
        return v;
      })
    ).flat()
  );
});
const map = Array.from({ length: 5 }, (_, i) =>
  mapFragment.map((line) =>
    line.map((x) => {
      const v = x + i;
      if (v > 9) return v - 9;
      return v;
    })
  )
).flat();

function coordsToString(x, y) {
  return `${x},${y}`;
}

function lookupByString(s) {
  const [x, y] = s.split(',').map(Number);
  return map[x][y];
}

function* getNeighbors(x, y) {
  for (const [x_, y_] of [
    [x - 1, y],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y],
  ]) {
    const neighborWeight = map[x]?.[y];
    if (neighborWeight !== undefined) {
      yield { coords: [x_, y_], weight: neighborWeight };
    }
  }
}

const graph = {};
for (let x = 0; x < map.length; x += 1) {
  for (let y = 0; y < map[0].length; y += 1) {
    graph[coordsToString(x, y)] = [...getNeighbors(x, y)].reduce(
      (acc, { coords: [x_, y_], weight }) => {
        acc[coordsToString(x_, y_)] = weight;
        return acc;
      },
      {}
    );
  }
}

const path = findPath(
  graph,
  coordsToString(0, 0),
  coordsToString(map.length - 1, map[map.length - 1].length - 1)
);

const totalRisk = path.slice(1).reduce((acc, n) => acc + lookupByString(n), 0);
console.log(totalRisk);
