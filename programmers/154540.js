const steps = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const collect = (graph, visited, start) => {
  let collected = 0;

  const [x, y] = start;
  if (visited[x][y] || graph[x][y] === 0) return 0;

  const stack = [start];
  visited[start[0]][start[1]] = true;

  while (stack.length > 0) {
    const [curX, curY] = stack.pop();
    collected += graph[curX][curY];

    for (const step of steps) {
      const nextX = curX + step[0];
      const nextY = curY + step[1];

      if (nextX < 0 || nextX > graph.length - 1 || nextY < 0 || nextY > graph[0].length - 1) {
        continue;
      }

      if (visited[nextX][nextY] || graph[nextX][nextY] === 0) {
        continue;
      }

      stack.push([nextX, nextY]);
      visited[nextX][nextY] = true;
    }
  }

  return collected;
};

function solution(maps) {
  const graph = maps.map(row => row.split('').map(v => (v === 'X' ? 0 : Number(v))));
  const answer = [];

  const visited = Array(graph.length)
    .fill(null)
    .map(_ => Array(graph[0].length).fill(false));

  for (let x = 0; x < graph.length; x++) {
    for (let y = 0; y < graph[0].length; y++) {
      answer.push(collect(graph, visited, [x, y]));
    }
  }

  const validAnswer = answer.filter(x => x > 0).sort((a, b) => a - b);

  return validAnswer.length === 0 ? [-1] : validAnswer;
}

console.log(solution(['X591X', 'X1X5X', 'X231X', '1XXX1']));
console.log(solution(['XXX', 'XXX', 'XXX']));
