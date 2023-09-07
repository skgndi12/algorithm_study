const getFactorialTable = () => {
  const factorialTable = Array(20 + 1).fill(1);

  for (let i = 0; i < 20; i++) {
    factorialTable[i + 1] = factorialTable[i] * (i + 1);
  }

  return factorialTable;
};

const factorialTable = getFactorialTable();

function solution(n, k) {
  const num = Array(n)
    .fill(null)
    .map((_, i) => i + 1);

  const result = [];

  for (i = n - 1; i >= 0; i--) {
    const target = num.splice(Math.floor((k - 1) / factorialTable[i]), 1);
    result.push(...target);

    k %= factorialTable[i];
  }

  return result;
}

console.log(solution(3, 5));
console.log(solution(4, 5));
console.log(solution(4, 6));
