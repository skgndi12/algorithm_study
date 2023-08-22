const solution = (length, word) => {
  let sum = 0;
  let target = '';

  for (const char of word) {
    if (isNaN(Number(char))) {
      if (target === '') continue;
      else {
        sum += Number(target);
        target = '';
      }
    } else target += char;
  }

  if (target !== '') sum += Number(target);

  return sum;
};

const solutionReg = word => {
  const regExp = new RegExp(/\d{1,6}/g);

  let sum = 0;
  let found;
  while ((found = regExp.exec(word))) {
    sum += +found[0];
  }

  return sum;
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/string/8595.txt').toString().trim().split('\n');

  // console.log(solution(+input[0], input[1]));
  console.log(solutionReg(input[1]));
}

if (require.main === module) {
  main();
}
