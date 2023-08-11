import sys
from typing import List, Tuple
input = sys.stdin.readline


def solution(day: int, num: int) -> int:
    dp = [(0, 0)] * day

    dp[0], dp[1] = (1, 0), (0, 1)

    for i in range(2, day):
        dp[i] = (dp[i - 1][0] + dp[i - 2][0], dp[i - 1][1] + dp[i - 2][1])

    return get_num_combination(dp[-1], num)


def get_num_combination(operand: Tuple[int, int], ref: int) -> Tuple[int, int]:
    for i in range(1, ref):
        remain = ref
        remain -= operand[0] * i

        if remain % operand[1] == 0:
            return i, remain // operand[1]


if __name__ == '__main__':
    D, K = map(int, input().split())

    A, B = solution(D, K)
    print(A)
    print(B)
