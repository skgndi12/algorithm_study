import sys
import math
from typing import List
input = sys.stdin.readline


def solution(start: int, end: int) -> List[int]:
    sieve = [True] * (end + 1)
    prime_numbers = []

    for i in range(2, int(math.sqrt(end) + 1)):
        if sieve[i]:
            j = 2
            while i * j <= end:
                sieve[i * j] = False
                j += 1

    start = max(2, start)
    for p in range(start, end + 1):
        if sieve[p]:
            prime_numbers.append(p)

    return prime_numbers


if __name__ == "__main__":
    M, N = map(int, input().split())
    result = solution(M, N)

    answer = '\n'.join([str(v) for v in result])
    print(answer)
