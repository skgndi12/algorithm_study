const fs = require('fs');
const inputs = fs.readFileSync('./baekjoon/binary_search/4158.txt').toString().trim().split('\n');

const biSearch = (arr, target) => {
  let s = 0;
  let e = arr.length - 1;
  let m;

  while (s <= e) {
    m = Math.floor((s + e) / 2);

    if (arr[m] === target) return true;

    if (+arr[m] < +target) s = m + 1;
    else e = m - 1;
  }

  return false;
};

function solution(longer, shorter) {
  let count = 0;

  shorter.forEach(n => {
    if (biSearch(longer, n)) count += 1;
  });

  return count;
}

let tcIndex = 0;
while (true) {
  const [N, M] = inputs[tcIndex + 0].split(' ').map(v => +v);
  if (N === 0 && M === 0) return;

  const cdOnBoy = inputs.slice(tcIndex + 1, tcIndex + N + 1);
  const cdOnGirl = inputs.slice(tcIndex + N + 1, tcIndex + N + M + 1);

  if (N >= M) console.log(solution(cdOnBoy, cdOnGirl));
  else console.log(solution(cdOnGirl, cdOnBoy));

  tcIndex += N + M + 1;
}
