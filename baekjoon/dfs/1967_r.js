const getFarthest = (start, length, tree) => {
  const visited = [0, ...Array(length).fill(-1)];

  const dfs = (from, cur, weight) => {
    if (visited[cur] >= 0) return;

    visited[cur] = visited[from] + weight;

    for (const edge of tree.get(cur)) {
      const { dest, weight } = edge;
      dfs(cur, dest, weight);
    }
  };

  dfs(0, start, 0);

  const cost = Math.max(...visited);
  const farthest = visited.indexOf(cost);

  return { farthest, cost };
};

const solution = (length, tree) => {
  if (length === 1) return 0;

  const oneEnd = getFarthest(1, length, tree).farthest;
  return getFarthest(oneEnd, length, tree).cost;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/dfs/1967.txt').toString().trim().split('\n');

  const tree = new Map();

  for (const edge of input.slice(1)) {
    const [u, v, weight] = edge.split(' ').map(Number);

    if (!tree.has(u)) tree.set(u, []);
    if (!tree.has(v)) tree.set(v, []);

    tree.get(u).push({ dest: v, weight });
    tree.get(v).push({ dest: u, weight });
  }

  console.log(solution(+input[0], tree));
}

if (require.main === module) {
  main();
}
