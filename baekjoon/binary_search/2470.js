const biSearch = (length, target, array) => {
  let s = 0;
  let e = length - 1;
  let m;

  while (s <= e) {
    m = parseInt((s + e) / 2);

    if (array[m] === target) break;
    else if (array[m] > target) e = m - 1;
    else s = m + 1;
  }

  return m;
};

const solve = (length, solutions) => {
  solutions.sort((a, b) => a - b);

  console.log(solutions);
  const pairs = []; // be priority queue

  for (let i = 0; i < length; i++) {
    const target = -solutions[i];
    pairs.push([i, biSearch(length, target, solutions)]);
  }

  let minPair = pairs[0];
  let minGap = Math.abs(solutions[minPair[1]] + solutions[minPair[0]]);

  for (let i = 0; i < pairs.length; i++) {
    const curGap = Math.abs(solutions[pairs[i][1]] + solutions[pairs[i][0]]);

    if (curGap >= minGap) continue;

    minPair = pairs[i];
    minGap = curGap;
  }

  return [solutions[minPair[0]], solutions[minPair[1]]].join(' ');
};

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/binary_search/2470.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  console.log(solve(input[0][0], input[1]));
}

if (require.main === module) {
  main();
}
