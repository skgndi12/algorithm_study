const solution = (length, tree) => {
  const visited = Array(length + 1).fill(false);
  const dp = Array(length + 1)
    .fill(null)
    .map(() => Array(2).fill(0));

  const getCountForSubTree = curNode => {
    visited[curNode] = true;
    dp[curNode][1] = 1;

    for (const childNode of tree[curNode]) {
      if (visited[childNode]) continue;
      getCountForSubTree(childNode);

      dp[curNode][1] += Math.min(dp[childNode][0], dp[childNode][1]);
      dp[curNode][0] += dp[childNode][1];
    }
  };

  getCountForSubTree(1);

  return Math.min(dp[1][0], dp[1][1]);
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/dp/2533.txt').toString().trim().split('\n');

  const length = +input[0];
  const tree = Array(length + 1)
    .fill(null)
    .map(() => []);

  for (const edge of input.slice(1)) {
    const [u, v] = edge.split(' ').map(Number);
    tree[u].push(v);
    tree[v].push(u);
  }

  console.log(solution(length, tree));
}

if (require.main === module) {
  main();
}
