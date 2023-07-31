const solution = (lastDate, durationProfitTable) => {
  const dp = Array(lastDate).fill(0);

  for (let i = 0; i < lastDate; i++) {
    const [duration, profit] = durationProfitTable[i];

    if (i + duration > lastDate) continue;

    dp[i] += profit;

    for (let j = i + duration; j < lastDate; j++) {
      dp[j] = Math.max(dp[j], dp[i]);
    }
  }

  return Math.max(...dp);
};

function main() {
  const fs = require('fs');
  const [N, ...arr] = fs
    .readFileSync('./baekjoon/brute_force/14501.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  console.log(solution(N[0], arr));
}

if (require.main === module) {
  main();
}
