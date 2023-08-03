const solution = size => {
  let k = 0;
  while (size !== 1) {
    size = size / 3;
    k += 1;
  }

  const dp = Array(9).fill('');
  dp[0] = '*';

  for (let i = 1; i < 9; i++) {
    const rows = dp[i - 1].split('\n');

    let side = '';
    for (const row of rows) {
      side += row.repeat(3) + '\n';
    }
    side = side.trim();

    let center = '';
    for (const row of rows) {
      center += row + ' '.repeat(3 ** (i - 1)) + row + '\n';
    }

    dp[i] = side + '\n' + center + side;
  }

  return dp[k];
};

function main() {
  const fs = require('fs');
  const input = +fs.readFileSync('./baekjoon/divide_and_conquer/2447.txt').toString().trim();

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
