const solutionBFS = length => {
  // dfs 로 접근하면 stack overflow !
  // bfs 해야함 <-- 시간초과
  // dp 로 해야함 !

  const queue = [{ screen: 1, clipboard: 0, counter: 0 }];

  while (queue.length > 0) {
    const { screen, clipboard, counter } = queue.shift();
    if (screen === length) return counter;

    // screen to clipboard
    if (screen !== clipboard) queue.push({ screen, clipboard: screen, counter: counter + 1 });

    // clipboard to screen
    if (clipboard > 0) queue.push({ screen: screen + clipboard, clipboard, counter: counter + 1 });

    // screen - 1
    if (screen > 0) queue.push({ screen: screen - 1, clipboard, counter: counter + 1 });
  }
};

const solution = length => {
  const dp = Array(10001).fill({ copy: 10001, counter: Number.MAX_SAFE_INTEGER });

  dp[1] = { copy: 0, counter: 0 };
  dp[2] = { copy: 1, counter: 2 };

  /*
  dp[1] => dp[1 + copy] = counter + 1 : dp[1] = {copy: 1, counter :1}
  dp[2] => dp[2 + copy] = counter + 1 : dp[3] = {copy: }
  dp[3] => dp[]
   */

  for (let i = 1; i < 10001; i++) {
    const { copy, counter } = dp[i];
    // dp[i + copy] = {copy, counter: counter + 1}
    if (!dp[i + copy]) dp[i + copy] = { copy, counter: counter + 1 };
    else if (dp[i + copy].counter > counter) dp[i + copy] = { copy, counter: counter + 1 };

    // dp[i + i] = {copy: i, counter: counter +1}
    if (dp[i + 1]) dp[i + i] = { copy: i, counter: counter + 1 };
    else if (dp[i + i].counter > counter) dp[i + i] = { copy: i, counter: counter + 1 };
  }

  return dp[length];
  // dp[10] = dp[5] + 2
  // dp[11] = dp[6] + 3
};

function main() {
  const fs = require('fs');
  const input = +fs.readFileSync('./baekjoon/graph_theory/14226.txt').toString().trim();

  console.log(solution(input));
}

if (require.main === module) {
  main();
}

// 1. screen to clipboard
// 2. clipboard to screen (clipboard length > 0)
// 3. screen - 1
