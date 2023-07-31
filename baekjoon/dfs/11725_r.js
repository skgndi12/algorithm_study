const solution = input => {
  const tree = new Map();

  const N = +input[0];

  for (const edge of input.slice(1)) {
    const [src, dest] = edge.split(' ').map(Number);

    if (!tree.has(src)) tree.set(src, []);
    if (!tree.has(dest)) tree.set(dest, []);

    tree.get(src).push(dest);
    tree.get(dest).push(src);
  }

  const parent = Array(N + 1).fill(0);
  const stack = [1];
  parent[1] = -1;

  while (stack.length > 0) {
    const src = stack.pop();
    for (const dest of tree.get(src)) {
      if (!!parent[dest]) continue;

      parent[dest] = src;
      stack.push(dest);
    }
  }

  return parent.slice(2).join('\n');
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/dfs/11725.txt').toString().trim().split('\n');

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
