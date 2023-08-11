const solution = (size, triangle) => {
  for (let level = 2; level < size + 1; level++) {
    for (let i = 0; i < level; i++) {
      if (i === 0) triangle[level][i] += triangle[level - 1][i];
      else if (i === level - 1) triangle[level][i] += triangle[level - 1][i - 1];
      else triangle[level][i] += Math.max(triangle[level - 1][i], triangle[level - 1][i - 1]);
    }
  }

  return Math.max(...triangle[size]);
};

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/dp/1932.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  console.log(solution(input[0][0], input));
}

if (require.main === module) {
  main();
}
