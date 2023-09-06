const count = (n, graph, start) => {
  const visited = Array(n + 1).fill(false);

  const stack = [start];
  visited[start] = true;

  while (stack.length > 0) {
    const cur = stack.pop();

    if (!graph.has(cur)) continue;

    for (const next of graph.get(cur)) {
      if (visited[next]) continue;

      visited[next] = true;
      stack.push(next);
    }
  }

  return visited.filter(v => v).length;
};

function solution(n, wires) {
  let answer = n;
  for (let i = 0; i < wires.length; i++) {
    const iterWires = [...wires];
    iterWires.splice(i, 1);

    const graph = new Map();

    for (const edge of iterWires) {
      const [v1, v2] = edge;

      if (!graph.has(v1)) graph.set(v1, []);
      if (!graph.has(v2)) graph.set(v2, []);

      graph.get(v1).push(v2);
      graph.get(v2).push(v1);
    }

    answer = Math.min(answer, Math.abs(count(n, graph, wires[i][0]) - count(n, graph, wires[i][1])));
  }

  return answer;
}

console.log(
  solution(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ])
);

console.log(
  solution(4, [
    [1, 2],
    [2, 3],
    [3, 4],
  ])
);

console.log(
  solution(7, [
    [1, 2],
    [2, 7],
    [3, 7],
    [3, 4],
    [4, 5],
    [6, 7],
  ])
);
