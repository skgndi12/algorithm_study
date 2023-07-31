const solution = (string1, string2, string3) => {
  const dp = Array.from({ length: string1.length + 1 }, () =>
    Array.from({ length: string2.length + 1 }, () => Array.from({ length: string3.length + 1 }, () => 0))
  );

  for (let i = 0; i < string1.length + 1; i++) {
    for (let j = 0; j < string2.length + 1; j++) {
      for (let k = 0; k < string3.length + 1; k++) {
        if (i === 0 || j === 0 || k === 0) dp[i][j][k] = 0;
        else if (string1[i - 1] === string2[j - 1] && string1[i - 1] === string3[k - 1])
          dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1;
        else dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i][j - 1][k], dp[i][j][k - 1]);
      }
    }
  }

  return dp[string1.length][string2.length][string3.length];
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/string/1958.txt').toString().trim().split('\n');

  console.log(solution(...input));
}

if (require.main === module) {
  main();
}
