const solution = (N, timeToProfit) => {
  // const table = Array(N + 1).fill(0);

  let profit = 0;
  let day = 1;

  const stack = [1];

  while (stack.length > 0) {
    const [t, p] = timeToProfit[stack.pop()];
    // if(day + t - 1 > N)
  }
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/brute_force/14501.txt').toString().trim().split('\n');

  const N = +input[0];
  const timeToProfit = input.map(v => v.split(' ').map(Number));

  console.log(solution(N, timeToProfit));
}

if (require.main === module) {
  main();
}
