/*
Figure out which board will win first. What will your final score be if you
choose that board?
*/

import readFile from '../read-file.js';

import Board from './board.js';

const lines = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  lines.push(line);
});

const drawnNumbers = lines.shift().split(',').map(Number);

const boardsData = [];
let thisBoard = [];
for (const line of lines) {
  if (line) {
    thisBoard.push(line);
    if (thisBoard.length === 5) {
      boardsData.push(thisBoard);
      thisBoard = [];
    }
  }
}

const boards = boardsData.map((board) => new Board(board));

for (const number of drawnNumbers) {
  for (const board of boards) {
    board.mark(number);
    if (board.validate()) {
      console.log(board.score(number));
      process.exit(0);
    }
  }
}
