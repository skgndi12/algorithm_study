function solution(length, numbers) {
  const dp = Array(length)
    .fill(null)
    .map(() => Array(2).fill(Number.MIN_SAFE_INTEGER));

  dp[0][0] = numbers[0];

  for (let i = 1; i < length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0] + numbers[i], numbers[i]);
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1] + numbers[i]);
  }

  return Math.max(...dp.map(row => Math.max(...row)));
}

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/dp/13398.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  console.log(solution(input[0][0], input[1]));
}

if (require.main === module) {
  main();
}
