/*
How many paths through this cave system are there that visit small caves at most
once?
*/

import readFile from '../read-file.js';

import Graph from './graph.js';

const graph = new Graph();
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [a, b] = line.split('-');
  graph.addConnection(a, b);
});

let totalPaths = 0;

function traverse(from = 'start', context_ = []) {
  const context = [...context_];

  if (from === 'end') {
    totalPaths += 1;
    return;
  }

  context.push(from);

  for (const neighbor of graph.getNeighbors(from)) {
    if (neighbor === neighbor.toUpperCase() || !context.includes(neighbor)) {
      traverse(neighbor, context);
    }
  }
}

traverse();
console.log(totalPaths);
