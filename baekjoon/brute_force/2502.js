const solution = (D, K) => {
  /*
41 21 20 1
41 22 19 3
41 23 18 5
41 24 17 7

41 25 16 9 7
41 25 16 9 7 2 <- 2, 7
41 26 15 11 4

41 27 14 13 1
*/

  for (let yesterday = Math.ceil(K / 2); yesterday < K; yesterday++) {
    const dp = [K, yesterday];

    while (true) {
      if (dp[dp.length - 1] * 2 >= dp[dp.length - 2] && dp[dp.length - 1] !== dp[dp.length - 2]) {
        dp.push(dp[dp.length - 2] - dp[dp.length - 1]);
        if (dp.length === D) return dp.reverse().slice(0, 2).join('\n');
      } else break;
    }

    if (dp.length === D) return dp.reverse().slice(0, 2).join('\n');
  }
};

function main() {
  const fs = require('fs');
  const [D, K] = fs.readFileSync('./baekjoon/brute_force/2502.txt').toString().trim().split(' ').map(Number);

  console.log(solution(D, K));
}

if (require.main === module) {
  main();
}
