export default class Line {
  #p1;

  #p2;

  constructor(lineString) {
    [this.#p1, this.#p2] = lineString.split(' -> ').map((s) => {
      const [x, y] = s.split(',').map(Number);
      return { x, y };
    });
  }

  isHorizontal() {
    return this.#p1.y === this.#p2.y;
  }

  isVertical() {
    return this.#p1.x === this.#p2.x;
  }

  *points() {
    if (this.isHorizontal()) {
      const y = this.#p1.y;
      for (
        let x = Math.min(this.#p1.x, this.#p2.x);
        x <= Math.max(this.#p1.x, this.#p2.x);
        x += 1
      ) {
        yield `${x},${y}`;
      }
    } else if (this.isVertical()) {
      const x = this.#p1.x;
      for (
        let y = Math.min(this.#p1.y, this.#p2.y);
        y <= Math.max(this.#p1.y, this.#p2.y);
        y += 1
      ) {
        yield `${x},${y}`;
      }
    } else {
      let x = this.#p1.x;
      let y = this.#p1.y;
      while (x !== this.#p2.x && y !== this.#p2.y) {
        yield `${x},${y}`;
        if (x < this.#p2.x) x += 1;
        else x -= 1;
        if (y < this.#p2.y) y += 1;
        else y -= 1;
      }
      yield `${x},${y}`;
    }
  }
}
