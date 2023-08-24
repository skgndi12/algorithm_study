const solution = (length, matrix) => {
  const pooling = (length, matrix) => {
    if (length === 1) return matrix[0][0];

    const half = length / 2;
    const pooled = Array(half)
      .fill(null)
      .map(() => Array(half).fill(0));

    for (let i = 0; i < half; i++) {
      for (let j = 0; j < half; j++) {
        const pool = [];
        pool.push(
          matrix[i * 2][j * 2],
          matrix[i * 2 + 1][j * 2],
          matrix[i * 2][j * 2 + 1],
          matrix[i * 2 + 1][j * 2 + 1]
        );
        pool.sort((a, b) => a - b);

        pooled[i][j] = pool[2];
      }
    }

    return pooling(half, pooled);
  };

  return pooling(length, matrix);
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/divide_and_conquer/17829.txt').toString().trim().split('\n');

  const n = +input.shift();
  const matrix = input.map(row => row.split(' ').map(Number));
  console.log(solution(n, matrix));
}

if (require.main === module) {
  main();
}
