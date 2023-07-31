const fs = require('fs');
const [N, K] = fs
  .readFileSync('./baekjoon/data_structure/11866.txt')
  .toString()
  .trim()
  .split(' ')
  .map(v => +v);

const solution = (N, K) => {
  let ret = [];
  let table = Array(N)
    .fill(0)
    .map((_, i) => i + 1);

  while (table.length >= 1) {
    const length = table.length;

    let index = length > K ? K - 1 : (K % length) - 1;
    if (index < 0) index = length - 1;

    ret.push(table[index]);
    table = [...table.slice(index + 1, length), ...table.slice(0, index)];
  }

  return '<' + ret.join(', ') + '>';
};

console.log(solution(N, K));
