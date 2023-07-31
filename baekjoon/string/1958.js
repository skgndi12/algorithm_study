const getLCS = (string1, string2) => {
  const LCS = Array(string1.length).fill(null);
  LCS.map((_, i) => (LCS[i] = Array(string2.length).fill([])));

  for (let i = 0; i < string1.length; i++) {
    for (let j = 0; j < string2.length; j++) {
      if (i === 0 || j === 0) LCS[i][j] = 0;
      else if (string1[i] === string2[j]) LCS[i][j] = LCS[i - 1][j - 1] + 1;
      else LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
    }
  }

  return LCS;
};

const solution = strings => {
  const [string1, string2, string3] = strings;
  // if (string1.length >= string2.length && string1 >= string3.length) {
  //   return getLCS(string1, getLCS(string2, string3)).length;
  // } else if (string2.length >= string1.length && string2.length >= string3.length) {
  //   return getLCS(string2, getLCS(string1, string3)).length;
  // } else {
  //   return getLCS(string3, getLCS(string1, string2)).length;
  // }
  return getLCS(string1, string2);
};

function main() {
  const fs = require('fs');
  const input = fs.readFileSync('./baekjoon/string/1958.txt').toString().trim().split('\n');

  console.log(solution(input));
}

if (require.main === module) {
  main();
}
