function isBalanced(line) {
  const chars = line.split('');
  const counters = [];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];

    switch (char) {
      case '.':
        if (counters.length > 0) return false;
        else return true;
      case '(':
        counters.push(')');
        break;
      case '[':
        counters.push(']');
        break;
      case ')':
        if (counters.pop() !== char) return false;
        break;
      case ']':
        if (counters.pop() !== char) return false;
        break;
      default:
        break;
    }
  }

  return true;
}

function solution(input) {
  let ans = [];

  input.forEach(line => {
    isBalanced(line) ? ans.push('yes') : ans.push('no');
  });

  return ans.join('\n');
}

function main() {
  const fs = require('fs');
  const input = fs
    .readFileSync('./baekjoon/data_structure/4949.txt')
    .toString()
    .trim()
    .split('\n')
    .filter(v => v !== '.');

  console.log(solution(input));
}

if (require.main === module) main();
