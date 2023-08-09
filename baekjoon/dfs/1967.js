const solution = (length, tree) => {
  const leaf = [];
  for (const node of tree) {
    if (node[1].length === 1) leaf.push(node[0]);
  }
  // leaf 에서 시작해서 leaf 에서 끝나는 경로의 가중치를 비교해야 함

  console.log(leaf);
  let max = 0;
  for (const start of leaf) {
    const visited = Array(length + 1).fill(false);
    const stack = [start];

    while (stack.length > 0) {}
  }
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
