import sys
from typing import List
input = sys.stdin.readline


def solution(strings: List[str]) -> int:
    [shortest, mid, longest] = sorted(strings, key=lambda x: len(x))
    dp = [[[0] * (len(longest)) for _ in range(len(mid))]
          for _ in range(len(shortest))]

    for i, c1 in enumerate(shortest):
        for j, c2 in enumerate(mid):
            for k, c3 in enumerate(longest):
                if i == j == k == 0:
                    continue

                if c1 == c2 == c3:
                    dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1
                else:
                    dp[i][j][k] = max(dp[i - 1][j][k], dp[i]
                                      [j - 1][k], dp[i][j][k - 1])

    return dp[-1][-1][-1]


if __name__ == '__main__':
    first = input().rstrip()
    second = input().rstrip()
    third = input().rstrip()

    first = '-' + first
    second = '-' + second
    third = '-' + third
    print(solution([first, second, third]))
