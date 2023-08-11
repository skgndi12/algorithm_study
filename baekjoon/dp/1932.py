import sys
from typing import List
input = sys.stdin.readline


def solution(height: int, triangles: List[List[int]]) -> int:
    dp = [[triangles[0][0]]]

    for i in range(1, height):
        row = []
        for j in range(len(triangles[i])):
            if j == 0:
                row.append(dp[i - 1][0] + triangles[i][j])
            elif j == len(triangles[i]) - 1:
                row.append(dp[i - 1][-1] + triangles[i][j])
            else:
                row.append(
                    triangles[i][j] + max(dp[i - 1][j - 1], dp[i - 1][j]))
        dp.append(row)

    return max(dp[-1])


if __name__ == '__main__':
    N = int(input())
    T = []
    for _ in range(N):
        T.append(list(map(int, input().split())))
    print(solution(N, T))
