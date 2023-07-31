const solution = (refs, targets) => {
  const S = new Set(refs);

  let count = 0;
  for (const target of targets) {
    if (S.has(target)) count += 1;
  }

  return count;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/string/14425.txt').toString().trim().split('\n');

  const N = +input[0].split(' ')[0];
  console.log(solution(input.slice(1, N + 1), input.slice(N + 1)));
}

if (require.main === module) {
  main();
}
