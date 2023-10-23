function getPrimes() {
  const count = Array(10000).fill(false);
  const primes = Array(10000).fill(false);

  for (let i = 2; i < 10000; i++) {
    if (count[i] === false && i > 1000) primes[i] = true;

    for (let j = i; j < 10000; j += i) {
      count[j] = true;
    }
  }

  return primes;
}

function getInput() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/bfs/1963.txt')
    .toString()
    .trim()
    .split('\n')
    .map(v => v.split(' ').map(Number));

  return [input[0][0], input.slice(1)];
}

function replaceAt(string, index, replacement) {
  return string.substring(0, index) + replacement + string.substring(index + 1);
}

function solution(primes, [start, target]) {
  let optStep = -1;

  const notVisited = [...primes];
  const queue = [[0, start]];
  notVisited[start] = false;

  while (queue.length > 0) {
    const [curStep, curNum] = queue.shift();

    if (curNum === target) {
      optStep = curStep;
      break;
    }

    const curNumStr = curNum.toString();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 4; j++) {
        const nextNum = Number(replaceAt(curNumStr, j, i.toString()));

        if (!primes[nextNum]) continue;

        if (notVisited[nextNum]) {
          queue.push([curStep + 1, nextNum]);
          notVisited[nextNum] = false;
        }
      }
    }
  }

  return optStep;
}

function main() {
  const primes = getPrimes();
  const [T, cases] = getInput();

  let ret = [];
  for (let tc = 0; tc < T; tc++) {
    const ans = solution(primes, cases[tc]);
    ans >= 0 ? ret.push(ans) : ret.push('impossible');
  }

  console.log(ret.join('\n'));
}

if (require.main === module) main();
