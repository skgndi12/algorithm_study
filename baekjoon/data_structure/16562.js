const solution = (totalCount, budget, friendFeeTable, graph) => {
  const visited = Array(totalCount + 1).fill(false);
  const cost = [];

  for (let start = 1; start < totalCount + 1; start++) {
    if (!!visited[start]) continue;

    const stack = [start];
    cost.push(10000);

    while (stack.length > 0) {
      const cur = stack.pop();
      if (!!visited[cur]) continue;

      visited[cur] = true;
      cost.push(Math.min(cost.pop(), friendFeeTable[cur - 1]));

      if (!graph.has(cur)) continue;
      for (const next of graph.get(cur)) {
        if (!!visited[next]) continue;
        stack.push(next);
      }
    }
  }

  const totalFee = cost.reduce((acc, cur) => acc + cur, 0);

  if (totalFee > budget || visited.slice(1).find(v => v === false)) return 'Oh no';
  else return totalFee;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/data_structure/16562.txt').toString().trim().split('\n');

  const [N, M, k] = input[0].split(' ').map(Number);
  const A = input[1].split(' ').map(Number);
  const graph = new Map();

  for (const edge of input.slice(2)) {
    const [u, v] = edge.split(' ').map(Number);

    if (!graph.has(u)) graph.set(u, new Set([]));
    if (!graph.has(v)) graph.set(v, new Set([]));

    if (u === v) continue;
    graph.get(u).add(v);
    graph.get(v).add(u);
  }

  console.log(solution(N, k, A, graph));
}

if (require.main === module) {
  main();
}
