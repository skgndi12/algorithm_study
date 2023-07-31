const getPrimes = () => {
  const BOUNDARY = 1000001;
  const count = Array(BOUNDARY).fill(false);

  for (let i = 2; i < BOUNDARY; i++) {
    if (count[i]) continue;

    for (let j = 2 * i; j < BOUNDARY; j += i) {
      count[j] = true;
    }
  }

  return count
    .map((isNotPrime, i) => (isNotPrime ? 0 : i))
    .filter(v => v > 0)
    .slice(1);
};

const solution = (M, N) => {
  const primes = getPrimes();
  const ret = [];

  for (const prime of primes) {
    if (prime > N) break;
    if (prime >= M) ret.push(prime);
  }
  return ret.join('\n');
};

function main() {
  const fs = require('fs');
  const [M, N] = fs.readFileSync('./baekjoon/number_theory/1929.txt').toString().trim().split(' ').map(Number);

  console.log(solution(M, N));
}

if (require.main === module) {
  main();
}
