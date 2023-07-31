const solution = numbers => {
  const result = Array(13).fill('');
  result[0] = '-';

  for (let i = 1; i < 13; i++) {
    result[i] = result[i - 1] + ' '.repeat(3 ** (i - 1)) + result[i - 1];
  }

  let ans = '';
  for (const number of numbers) ans += result[number] + '\n';

  return ans;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/divide_and_conquer/4779.txt').toString().trim().split('\n').map(Number);

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
