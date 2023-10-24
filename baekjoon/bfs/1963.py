from collections import deque
import math
import sys
from typing import List, Set

input = sys.stdin.readline


def get_primes() -> Set[int]:
    n = 9999  # 2부터 1,000까지의 모든 수에 대하여 소수 판별
    array = [True for i in range(n + 1)]  # 처음엔 모든 수가 소수(True)인 것으로 초기화

    # 에라토스테네스의 체 알고리즘
    for i in range(2, int(math.sqrt(n)) + 1):  # 2부터 n의 제곱근까지의 모든 수를 확인하며
        if array[i] == True:  # i가 소수인 경우 (남은 수인 경우)
            # i를 제외한 i의 모든 배수를 지우기
            j = 2
            while i * j <= n:
                array[i * j] = False
                j += 1

    primes = set()
    for i, v in enumerate(array):
        if v:
            primes.add(i)

    return primes


def solution(src: int, target: int, primes: Set[int]):
    result = bfs(src, target, primes)

    if result < 0:
        print("Impossible")
    else:
        print(result)


def bfs(start: int, target: int, primes: Set[int]) -> int:
    queue = deque([(start, 0)])
    visited = set([start])
    d = [(0, True), (0, False), (1, True), (1, False), (2, True), (2, False), (3, True), (3, False)]

    while queue:
        cur_prime, cur_repeat = queue.popleft()

        if cur_prime == target:
            return cur_repeat

        for i in range(8):
            exp_num, is_add = d[i]
            op_num = pow(10, exp_num)
            before = cur_prime // pow(10, exp_num + 1)

            for j in range(1, 10):
                if is_add:
                    next_num = cur_prime + (op_num * j)
                else:
                    next_num = cur_prime - (op_num * j)

                after = next_num // pow(10, exp_num + 1)

                if after != before:
                    continue

                if not (1000 <= next_num < 10000):
                    continue

                if next_num in visited:
                    continue

                if next_num not in primes:
                    continue

                visited.add(next_num)
                queue.append((next_num, cur_repeat + 1))

    return -1


if __name__ == "__main__":
    case_num = int(input())
    primes = get_primes()

    for _ in range(case_num):
        src, target = list(map(int, input().split()))
        solution(src, target, primes)
