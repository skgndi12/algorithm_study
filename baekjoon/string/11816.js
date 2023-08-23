const solution = string => {
  const radix = string.startsWith('0x') ? 16 : string.startsWith('0') ? 8 : 10;

  return parseInt(string, radix);
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/string/11816.txt').toString().trim();

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
