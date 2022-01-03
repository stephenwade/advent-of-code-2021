const add = (a, b) => a + b;

export default class Board {
  #board;

  constructor(lines) {
    this.#board = lines.map((line) =>
      line
        .split(' ')
        .filter((x) => x)
        .map((x) => ({ number: Number(x), marked: false }))
    );

    this.won = false;
  }

  mark(number) {
    for (const line of this.#board) {
      for (const cell of line) {
        if (cell.number === number) {
          cell.marked = true;
        }
      }
    }
  }

  validate() {
    if (this.won) return true;

    for (const row of this.#rows()) {
      if (row.every((cell) => cell.marked)) {
        this.won = true;
        return true;
      }
    }

    for (const column of this.#columns()) {
      if (column.every((cell) => cell.marked)) {
        this.won = true;
        return true;
      }
    }

    return false;
  }

  score(winningNumber) {
    const sumUnmarkedNumbers = this.#board
      .flat()
      .filter((cell) => !cell.marked)
      .map((cell) => cell.number)
      .reduce(add);

    return sumUnmarkedNumbers * winningNumber;
  }

  *#rows() {
    for (const row of this.#board) {
      yield row;
    }
  }

  *#columns() {
    for (let i = 0; i < this.#board[0].length; i += 1) {
      yield this.#board.map((line) => line[i]);
    }
  }
}
