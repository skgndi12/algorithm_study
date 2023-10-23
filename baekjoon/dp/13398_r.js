function solution(length, numbers) {
  const dp = Array(2)
    .fill(null)
    .map(() => Array(length).fill(Number.MIN_SAFE_INTEGER));

  dp[0][0] = numbers[0];
  let max = dp[0][0];

  for (let i = 1; i < length; i++) {
    dp[0][i] = Math.max(dp[0][i - 1] + numbers[i], numbers[i]);
    dp[1][i] = Math.max(dp[1][i - 1] + numbers[i], dp[0][i - 1]);
    max = Math.max(max, dp[0][i], dp[1][i]);
  }

  return max;
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
