const STEP = {
  odd: [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [1, -1],
    [1, 1],
  ],
  even: [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
  ],
};

const solution = input => {
  const [W, H] = input[0].split(' ').map(v => +v);
  const graph = Array(H + 2).fill([]);

  for (let i = 0; i < graph.length; i++) graph[i] = new Array(W + 2).fill(0);
  input.splice(1).forEach((row, i) => row.split(' ').forEach((col, j) => (graph[i + 1][j + 1] = +col)));

  const queue = [[0, 0]];

  let wall = 0;
  while (!!queue.length) {
    const [x, y] = queue.shift();
    if (graph[y][x] === -1) continue;
    graph[y][x] = -1; //visited check

    const step = y % 2 === 0 ? STEP.even : STEP.odd;

    for (const [stepX, stepY] of step) {
      const [destX, destY] = [x + stepX, y + stepY];
      if (destX < 0 || destY < 0 || destX > W + 1 || destY > H + 1) continue;

      if (graph[destY][destX] === 1) wall += 1;
      else if (graph[destY][destX] === 0) queue.push([destX, destY]);
    }
  }

  return wall;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/bfs/5547.txt').toString().trim().split('\n');

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
