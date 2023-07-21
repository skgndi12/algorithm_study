// const solution = input => {
//   const workerMap = new Map();

//   for (const log of input.slice(1)) {
//     const [name, desc] = log.split(' ');

//     desc.startsWith('e') ? workerMap.set(name, 1) : workerMap.set(name, 0);
//   }

//   const curWorker = [];
//   for (const [key, value] of workerMap) if (value) curWorker.push(key);

//   return curWorker.sort().reverse().join('\n');
// };

const solution = input => {
  const curWorker = new Set();

  for (const log of input.slice(1)) {
    const [name, desc] = log.split(' ');

    desc.startsWith('e') ? curWorker.add(name) : curWorker.delete(name);
  }

  return Array.from(curWorker).sort().reverse().join('\n');
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/data_structure/7785.txt').toString().trim().split('\n');

  console.log(solution(input));
}

if (require.main === module) main();
