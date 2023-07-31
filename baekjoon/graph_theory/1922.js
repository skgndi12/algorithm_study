const solution = (computerCount, graph) => {
  const visited = Array(computerCount + 1).fill(false);
  // const
};

function main() {
  const fs = require('fs');
  const [N, M, ...edges] = fs.readFileSync('./baekjoon/graph_theory/1922.txt').toString().trim().split('\n');

  const graph = new Map();

  for (const edge of edges) {
    const [u, v, cost] = edge.split(' ').map(Number);

    if (!graph.get(u)) graph.set(u, []);
    if (!graph.get(v)) graph.set(v, []);

    graph.get(u).push({ dest: v, cost });
    graph.get(v).push({ dest: u, cost });
  }

  for (let i = 1; i < N + 1; i++) {
    graph.get(i) && graph.get(i).sort((a, b) => b.cost - a.cost);
  }

  console.log(solution(N, graph));
}

if (require.main === module) {
  main();
}
