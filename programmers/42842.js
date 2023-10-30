function solution(brown, yellow) {
  let answer = [];

  const sides = brown - 4;
  const widthAndHeight = Math.floor(sides / 2);

  for (let width = 1; width < widthAndHeight; width++) {
    const height = widthAndHeight - width;

    if (width * height === yellow) {
      answer = [height + 2, width + 2];
      break;
    }
  }

  return answer;
}
