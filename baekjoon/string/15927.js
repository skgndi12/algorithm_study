const solution = string => {
  const char = string[0];
  if (string.filter(v => v !== char).length === 0) return -1;

  for (let i = 0; i < Math.floor(string.length / 2); i++) {
    if (string[i] !== string[string.length - 1 - i]) return string.length;
  }

  return string.length - 1;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/string/15927.txt').toString().trim().split('');

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
