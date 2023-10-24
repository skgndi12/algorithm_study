function replaceAt(string, index, replacement) {
  return string.substring(0, index) + replacement + string.substring(index + 1);
}

function solution(begin, target, words) {
  const queue = [[0, begin]];
  const wordLength = begin.length;
  const replacementSet = new Set();
  const visited = new Map();

  words.forEach(word => {
    visited.set(word, false);
    word.split('').forEach(v => replacementSet.add(v));
  });
  visited.set(begin, true);

  let ans = 0;

  while (queue.length > 0) {
    const [curStep, curWord] = queue.shift();

    if (curWord === target) {
      ans = curStep;
      break;
    }

    for (let i = 0; i < wordLength; i++) {
      replacementSet.forEach(alphabet => {
        const newWord = replaceAt(curWord, i, alphabet);

        if (visited.get(newWord) === false) {
          visited.set(newWord, true);
          queue.push([curStep + 1, newWord]);
        }
      });
    }
  }

  return ans;
}
