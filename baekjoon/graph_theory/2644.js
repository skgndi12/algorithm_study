const solution = (headCount, src, dest, tree) => {
  const stack = [{ from: src, to: tree.get(src) }];
  const distance = Array(headCount + 1).fill(-1);
  distance[src] = 0;

  while (stack.length > 0) {
    const frontier = stack.pop();

    for (const next of frontier.to) {
      if (distance[next] !== -1) continue;

      distance[next] = distance[frontier.from] + 1;
      stack.push({ from: next, to: tree.get(next) });
    }
  }

  return distance[dest];
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/graph_theory/2644.txt').toString().trim().split('\n');

  const n = +input[0];
  const [src, dest] = input[1].split(' ').map(Number);
  const tree = new Map();
  const edges = input.slice(3);
  for (const edge of edges) {
    const [src, dest] = edge.split(' ').map(Number);

    if (!tree.has(src)) tree.set(src, []);
    if (!tree.has(dest)) tree.set(dest, []);

    tree.get(src).push(dest);
    tree.get(dest).push(src);
  }

  console.log(solution(n, src, dest, tree));
}

if (require.main === module) {
  main();
}
