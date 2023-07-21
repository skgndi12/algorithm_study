const biSearch = (arr, target) => {
  let s = 0;
  let e = arr.length;
  let m;

  while (s <= e) {
    m = Math.floor((s + e) / 2);

    if (+arr[m] === +target) return true;
    else if (+arr[m] > +target) e = m - 1;
    else s = m + 1;
  }

  return false;
};

const solution = (longer, shorter) => {
  let count = 0;

  for (const cd of shorter) if (biSearch(longer, cd)) count += 1;

  return count;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/binary_search/4158.txt').toString().trim().split('\n');

  let tcIndex = 0;

  let ans = [];
  while (true) {
    const [N, M] = input[tcIndex].split(' ').map(Number);
    if (N === 0 && M === 0) break;

    const cdGroup1 = input.slice(tcIndex + 1, tcIndex + N + 1);
    const cdGroup2 = input.slice(tcIndex + N + 1, tcIndex + N + M + 1);

    const longer = cdGroup1.length >= cdGroup2.length ? cdGroup1 : cdGroup2;
    const shorter = cdGroup1.length < cdGroup2.length ? cdGroup1 : cdGroup2;

    ans.push(solution(longer, shorter));

    tcIndex += N + M + 1;
  }

  console.log(ans.join('\n'));
}

main();
