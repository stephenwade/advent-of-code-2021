/*
Find the first illegal character in each corrupted line of the navigation
subsystem. What is the total syntax error score for those errors?
*/

import readFile from '../read-file.js';

const lines = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  lines.push(line);
});

class IncompleteError extends Error {
  constructor() {
    super();
    this.name = 'IncompleteError';
  }
}

class CorruptedError extends Error {
  constructor(problemChar) {
    super();
    this.problemChar = problemChar;
    this.name = 'CorruptedError';
  }
}

function parse(input, context_ = []) {
  if (input.length === 0) {
    if (context_.length === 0) return;

    throw new IncompleteError();
  }

  const [ch, ...rest] = [...input];
  const context = [...context_];

  if (ch === '(' || ch === '[' || ch === '{' || ch === '<') {
    parse(rest, (context.push(ch), context));
    return;
  }

  const lastCh = context.pop();

  if (ch === ')') {
    if (lastCh === '(') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError(ch);
  }

  if (ch === ']') {
    if (lastCh === '[') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError(ch);
  }

  if (ch === '}') {
    if (lastCh === '{') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError(ch);
  }

  if (ch === '>') {
    if (lastCh === '<') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError(ch);
  }

  throw new Error();
}

let totalScore = 0;

for (const line of lines) {
  try {
    parse(line);
  } catch (e) {
    if (e instanceof IncompleteError) {
      // ignored
    } else if (e instanceof CorruptedError) {
      switch (e.problemChar) {
        case ')':
          totalScore += 3;
          break;

        case ']':
          totalScore += 57;
          break;

        case '}':
          totalScore += 1197;
          break;

        case '>':
          totalScore += 25137;
          break;

        // no default
      }
    } else {
      throw e;
    }
  }
}

console.log(totalScore);
