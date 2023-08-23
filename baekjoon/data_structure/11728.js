const solution = (A, B) => {
  A.reverse();
  B.reverse();

  const merge = [];
  while (A.length && B.length) {
    A[A.length - 1] > B[B.length - 1] ? merge.push(B.pop()) : merge.push(A.pop());
  }

  A.length ? merge.push(...A.reverse()) : merge.push(...B.reverse());
  return merge.join(' ');
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/data_structure/11728.txt').toString().trim().split('\n');

  console.log(solution(input[1].split(' ').map(Number), input[2].split(' ').map(Number)));
}

if (require.main === module) {
  main();
}
