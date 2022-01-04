/*
Find the completion string for each incomplete line, score the completion
strings, and sort the scores. What is the middle score?
*/

import readFile from '../read-file.js';

const lines = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  lines.push(line);
});

class IncompleteError extends Error {
  constructor(context) {
    super();
    this.context = context;
    this.name = 'IncompleteError';
  }
}

class CorruptedError extends Error {
  constructor() {
    super();
    this.name = 'CorruptedError';
  }
}

function parse(input, context_ = []) {
  if (input.length === 0) {
    if (context_.length === 0) return;

    throw new IncompleteError(context_);
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
    throw new CorruptedError();
  }

  if (ch === ']') {
    if (lastCh === '[') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError();
  }

  if (ch === '}') {
    if (lastCh === '{') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError();
  }

  if (ch === '>') {
    if (lastCh === '<') {
      parse(rest, context);
      return;
    }
    throw new CorruptedError();
  }

  throw new Error();
}

const scores = [];

for (const line of lines) {
  try {
    parse(line);
  } catch (e) {
    if (e instanceof CorruptedError) {
      // ignored
    } else if (e instanceof IncompleteError) {
      const [...context] = e.context;

      let score = 0;

      while (context.length > 0) {
        switch (context.pop()) {
          case '(':
            score = score * 5 + 1;
            break;

          case '[':
            score = score * 5 + 2;
            break;

          case '{':
            score = score * 5 + 3;
            break;

          case '<':
            score = score * 5 + 4;
            break;

          // no default
        }
      }

      scores.push(score);
    } else {
      throw e;
    }
  }
}

scores.sort((a, b) => a - b);
console.log(scores[(scores.length - 1) / 2]);
