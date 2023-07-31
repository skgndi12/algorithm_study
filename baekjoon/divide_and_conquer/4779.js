const solution = numbers => {
  const result = Array(13).fill('');
  result[0] = '-';

  for (let i = 1; i < 13; i++) {
    result[i] = result[i - 1] + ' '.repeat(3 ** (i - 1)) + result[i - 1];
  }

  let ans = '';
  for (const number of numbers) {
    ans += result[number] + '\n';
  }

  return ans;
};

class Cantor {
  constructor() {
    this.dp = Array(13).fill('');
    this.dp[0] = '-';

    for (let i = 1; i < 13; i++) {
      this.dp[i] = this.dp[i - 1] + ' '.repeat(3 ** (i - 1)) + this.dp[i - 1];
    }
  }

  draw = number => this.dp[number];
}

const solution2 = number => {
  const cantor = new Cantor();

  return cantor.draw(number);
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/divide_and_conquer/4779.txt').toString().trim().split('\n').map(Number);

  // console.log(solution(input));
  // console.log(solution2(input))
  let ans = '';
  for (const number of input) {
    ans += solution2(number) + '\n';
  }
  console.log(ans);
}

if (require.main === module) {
  main();
}
