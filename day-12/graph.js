export default class Graph {
  #adjacencyList = new Map();

  addConnection(a, b) {
    this.#addToList(a, b);
    this.#addToList(b, a);
  }

  #addToList(a, b) {
    if (b !== 'start') {
      if (!this.#adjacencyList.has(a)) {
        this.#adjacencyList.set(a, new Set());
      }

      this.#adjacencyList.get(a).add(b);
    }
  }

  getNeighbors(x) {
    if (this.#adjacencyList.has(x)) return [...this.#adjacencyList.get(x)];
    return undefined;
  }
}
