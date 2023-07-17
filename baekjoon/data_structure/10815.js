const fs = require('fs');
const inputs = fs.readFileSync('./baekjoon/data_structure/10815.txt').toString().trim().split('\n');

const cards = inputs[1].split(' ').map(v => +v);
const targets = inputs[3].split(' ').map(v => +v);

//TODO: set 로 다시 풀기

function solution(cards, targets) {
  const ret = [];

  const inHand = new Map();

  cards.forEach(e => inHand.set(e, e));

  targets.forEach(n => {
    if (inHand.has(n)) ret.push(1);
    else ret.push(0);
  });

  return ret.join(' ');
}

console.log(solution(cards, targets));
