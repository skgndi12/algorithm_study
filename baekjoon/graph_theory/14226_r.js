const solution = length => {
  const queue = [{ screen: 1, clipboard: 0, counter: 0 }];
  const visited = Array(1001).fill([]);
  for (let i = 0; i < 1001; i++) {
    visited[i] = Array(1001).fill(false);
  }

  while (queue.length > 0) {
    const { screen, clipboard, counter } = queue.shift();
    if (visited[screen][clipboard]) continue;

    visited[screen][clipboard] = true;

    if (screen === length) return counter;

    // screen to clipboard
    if (screen !== clipboard) queue.push({ screen, clipboard: screen, counter: counter + 1 });

    // clipboard to screen
    if (clipboard > 0 && screen + clipboard < 1001)
      queue.push({ screen: screen + clipboard, clipboard, counter: counter + 1 });

    // screen - 1
    if (screen > 0) queue.push({ screen: screen - 1, clipboard, counter: counter + 1 });
  }
};
/*
const solution2 = length => {
  const num = Array(1001)
    .fill(null)
    .map((_, i) => i);

  let i = 1;
  while (i <= length) {
    let j = 2;
    num[i - 1] = Math.min(num[i - 1], num[i] + 1);
    while (i * j < 1001) {
      num[i * j] = Math.min(num[i * j], num[i] + j);
      num[i * j - 1] = Math.min(num[i * j - 1], num[i * j] + 1);
      j += 1;
    }
    i += 1;
  }

  return num[length];
};
*/
function main() {
  const fs = require('fs');
  const input = +fs.readFileSync('./baekjoon/graph_theory/14226.txt').toString().trim();

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
