const ALPHABET = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function solution(s, skip, index) {
  const alphabetSet = new Set(ALPHABET);
  for (const target of skip) {
    alphabetSet.delete(target);
  }
  const validAlphabet = [...alphabetSet.keys()];

  const encodingMap = new Map();
  validAlphabet.forEach((v, i) => {
    const value = (i + index) % validAlphabet.length;

    encodingMap.set(v, validAlphabet[value]);
  });

  return s
    .split('')
    .map(v => encodingMap.get(v))
    .join('');
}

console.log(solution('aukks', 'wbqd', 5));
console.log(solution('abcde', 'b', 3));
