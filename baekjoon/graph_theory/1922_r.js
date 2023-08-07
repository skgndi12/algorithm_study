class UnionFind {
  constructor(size) {
    this.parent = Array(size + 1)
      .fill(0)
      .map((_, i) => i);
  }

  find = x => {
    if (this.parent[x] === x) return x;

    this.parent[x] = this.find(this.parent[x]);

    return this.parent[x];
  };

  union = (x, y) => {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (rootX < rootY) this.parent[rootY] = rootX;
    else this.parent[rootX] = rootY;

    return true;
  };
}

const solution = (computerCount, edges) => {
  const visited = [];
  let totalCost = 0;
  const tree = new UnionFind(computerCount);

  while (true) {
    const edge = edges.pop();
    const cost = edge.pop();

    if (!tree.union(...edge)) continue;

    visited.push(edge);
    totalCost += cost;

    if (visited.length === computerCount - 1) break;
  }

  return totalCost;
};

function main() {
  const fs = require('fs');
  const [N, M, ...edges] = fs
    .readFileSync('./baekjoon/graph_theory/1922.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  edges.sort((a, b) => b[2] - a[2]);

  console.log(solution(N[0], edges));
}

if (require.main === module) {
  main();
}
