/*
What is the lowest total risk of any path from the top left to the bottom right?
*/

import readFile from '../read-file.js';

import findPath from './dijkstra.js';

const map = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  map.push(line.split('').map(Number));
});

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
