const solution = (length, tree) => {
  const getEarlyAdapterCount = isRootCounted => {
    const earlyAdapter = Array(length + 1).fill(false);

    earlyAdapter[1] = isRootCounted;

    for (let node = 1; node < length + 1; node++) {
      if (!earlyAdapter[node]) {
        for (const child of tree.get(node)) {
          earlyAdapter[child] = true;
        }
      }
    }

    console.log(earlyAdapter);
    return earlyAdapter.filter(v => v).length;
  };

  return Math.min(getEarlyAdapterCount(true), getEarlyAdapterCount(false));
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/dp/2533.txt').toString().trim().split('\n');

  const tree = new Map();

  for (const edge of input.slice(1)) {
    const [u, v] = edge.split(' ').map(Number);

    if (!tree.has(u)) tree.set(u, new Set());
    if (!tree.has(v)) tree.set(v, new Set());

    if (u < v) tree.get(u).add(v);
    else tree.get(v).add(u);
  }

  console.log(solution(+input[0], tree));
}

if (require.main === module) {
  main();
}

//               1
//            2     3
//          4      5 6
//       7 8 9
//
