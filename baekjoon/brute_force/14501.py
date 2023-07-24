import sys
from typing import List
input = sys.stdin.readline


def solution(schedules: List[int], rewards: List[int]) -> int:
    dp = [0] * (len(schedules))

    for i in range(len(schedules)):
        if schedules[i] + i <= len(schedules) - 1:
            dp[schedules[i] + i] = max(dp[i] +
                                       rewards[i], dp[schedules[i] + i])

    print(dp)
    return max(dp)


if __name__ == '__main__':
    N = int(input())
    T, P = [0] * N, [0] * N

    for i in range(N):
        T[i], P[i] = map(int, input().split())

    print(solution(T, P))
