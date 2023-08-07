const solve = solutions => {
  let left = 0;
  let right = solutions.length - 1;
  let bestPair = { absSum: 2000000001, pair: [] };

  while (left < right) {
    const sum = solutions[left] + solutions[right];

    if (Math.abs(sum) < bestPair.absSum) {
      bestPair = { absSum: Math.abs(sum), pair: [solutions[left], solutions[right]] };
    }

    if (sum === 0) break;
    else if (sum > 0) right -= 1;
    else left += 1;
  }

  return bestPair.pair.join(' ');
};

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/binary_search/2470.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  console.log(solve(input[1].sort((a, b) => a - b)));
}

if (require.main === module) {
  main();
}
