/*
Big caves can be visited any number of times, a single small cave can be visited
at most twice, and the remaining small caves can be visited at most once.

Given these new rules, how many paths through this cave system are there?
*/

import readFile from '../read-file.js';

import Graph from './graph.js';

const graph = new Graph();
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [a, b] = line.split('-');
  graph.addConnection(a, b);
});

let totalPaths = 0;

function countDuplicates(array) {
  const set = new Set(array);
  return array.length - set.size;
}

function traverse(from = 'start', context_ = []) {
  const context = [...context_];

  if (from === 'end') {
    totalPaths += 1;
    return;
  }

  context.push(from);

  for (const neighbor of graph.getNeighbors(from)) {
    if (
      neighbor === neighbor.toUpperCase() ||
      countDuplicates(
        [...context, neighbor].filter((x) => x === x.toLowerCase())
      ) < 2
    ) {
      traverse(neighbor, context);
    }
  }
}

traverse();
console.log(totalPaths);
