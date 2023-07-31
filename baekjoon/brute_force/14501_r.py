import sys
from typing import List, Tuple
input = sys.stdin.readline


def solution(schedules: List[Tuple[int, int]]) -> int:
    dp = [0] * (len(schedules) + 1)

    for i, [time, profit] in enumerate(schedules):
        if i > 0 and dp[i] < max(dp[:i]):
            dp[i] = max(dp[:i])
        if i + time <= len(schedules):
            dp[i + time] = max(dp[i + time], dp[i] + profit)

    return max(dp)


if __name__ == '__main__':
    N = int(input())
    R = []

    for _ in range(N):
        T, S = map(int, input().split())
        R.append((T, S))

    print(solution(R))
