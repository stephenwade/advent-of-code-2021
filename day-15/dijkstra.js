/**
 * Adapted from https://github.com/tcort/dijkstrajs
 */

/**
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * A very naive priority queue implementation.
 */
const PriorityQueue = {
  make(opts) {
    const T = PriorityQueue;
    const t = {};
    for (const key of Object.keys(T)) {
      if (Object.prototype.hasOwnProperty.call(T, key)) {
        t[key] = T[key];
      }
    }
    t.queue = [];
    t.sorter = opts?.sorter || T.defaultSorter;
    return t;
  },

  defaultSorter(a, b) {
    return a.cost - b.cost;
  },

  /**
   * Add a new item to the queue and ensure the highest priority element
   * is at the front of the queue.
   */
  push(value, cost) {
    const item = { value, cost };
    this.queue.push(item);
    this.queue.sort(this.sorter);
  },

  /**
   * Return the highest priority element in the queue.
   */
  pop() {
    return this.queue.shift();
  },

  empty() {
    return this.queue.length === 0;
  },
};

function singleSourceShortestPaths(graph, s, d) {
  // Predecessor map for each node that has been encountered.
  // node ID => predecessor node ID
  const predecessors = {};

  // Costs of shortest paths from s to all nodes encountered.
  // node ID => cost
  const costs = {};
  costs[s] = 0;

  // Costs of shortest paths from s to all nodes encountered; differs from
  // `costs` in that it provides easy access to the node that currently has
  // the known shortest path from s.
  // XXX: Do we actually need both `costs` and `open`?
  const open = PriorityQueue.make();
  open.push(s, 0);

  while (!open.empty()) {
    // In the nodes remaining in graph that have a known cost from s,
    // find the node, u, that currently has the shortest path from s.
    const closest = open.pop();
    const u = closest.value;
    const costofStoU = closest.cost;

    // Get nodes adjacent to u...
    const adjacentNodes = graph[u] || {};

    // ...and explore the edges that connect u to those nodes, updating
    // the cost of the shortest paths to any or all of those nodes as
    // necessary. v is the node across the current edge from u.
    for (const v of Object.keys(adjacentNodes)) {
      if (Object.prototype.hasOwnProperty.call(adjacentNodes, v)) {
        // Get the cost of the edge running from u to v.
        const costofE = adjacentNodes[v];

        // Cost of s to u plus the cost of u to v across e--this is *a*
        // cost from s to v that may or may not be less than the current
        // known cost to v.
        const costofStoUplusCostofE = costofStoU + costofE;

        // If we haven't visited v yet OR if the current known cost from s to
        // v is greater than the new cost we just found (cost of s to u plus
        // cost of u to v across e), update v's cost in the cost list and
        // update v's predecessor in the predecessor list (it's now u).
        const costofStoV = costs[v];
        const firstVisit = typeof costs[v] === 'undefined';
        if (firstVisit || costofStoV > costofStoUplusCostofE) {
          costs[v] = costofStoUplusCostofE;
          open.push(v, costofStoUplusCostofE);
          predecessors[v] = u;
        }
      }
    }
  }

  if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
    const msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
    throw new Error(msg);
  }

  return predecessors;
}

function extractShortestPathFromPredecessorList(predecessors, d) {
  const nodes = [];
  let u = d;
  while (u) {
    nodes.push(u);
    u = predecessors[u];
  }
  nodes.reverse();
  return nodes;
}

export default function findPath(graph, s, d) {
  const predecessors = singleSourceShortestPaths(graph, s, d);
  return extractShortestPathFromPredecessorList(predecessors, d);
}
