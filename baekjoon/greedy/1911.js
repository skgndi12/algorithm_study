function solution(LENGTH, ponds) {
  ponds.sort((a, b) => a[0] - b[0]);

  let totalUsed = 0;
  let lastCovered = 0;

  ponds.forEach(([left, right]) => {
    let needToCover;

    if (lastCovered >= right - 1) {
      needToCover = 0;
    } else if (lastCovered >= left) {
      needToCover = right - lastCovered - 1;
    } else {
      needToCover = right - left;
      lastCovered = left - 1;
    }

    const used = Math.ceil(needToCover / LENGTH);

    lastCovered += used * LENGTH;
    totalUsed += used;
  });

  return totalUsed;
}

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/greedy/1911.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  console.log(solution(input[0][1], input.slice(1)));
}

if (require.main === module) main();
