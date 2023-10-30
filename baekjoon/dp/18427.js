const DIV = 10007;

function solution([length, max, target], students) {
  let ans = 0;

  function dfs(sum, i) {
    if (sum > target) return;

    if (sum === target) {
      ans += 1;
      return;
    }

    if (i >= length) return;

    dfs(sum, i + 1);
    for (const block of students[i]) {
      dfs(sum + block, i + 1);
    }
  }

  dfs(0, 0);

  return ans % DIV;
}

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/dp/18427.txt')
    .toString()
    .split('\n')
    .map(tc => tc.split(' ').map(Number));

  console.log(solution(input[0], input.slice(1)));
}

if (require.main === module) main();
