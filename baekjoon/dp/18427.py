import sys
from typing import List

input = sys.stdin.readline


def solution(students: int, max_blocks: int, height: int, blocks: List[List[int]]) -> int:
    dp = [[0] * (len(blocks[i])) for i in range(len(blocks))]
    dp[0] = blocks[0]

    # for i in range(1, len(dp)):
    #     for j in range(len(dp[i])):
    #         for k in range(len(dp[i - 1])):
    #             # if blocks[i][j] + dp[i - 1][k] <= height:
    #             #     row.append(blocks[i][j] + dp[i - 1][k])
    #             if dp[i][j] + dp[i - 1][k] <= height:
    #                 dp[i + 1][k] = dp[i][j] + dp[i - 1][k]

    for i in range(1, len(dp)):
        for k in range(len(dp[i - 1])):
            for j in range(len(dp[i])):
                if blocks[i][j] + dp[i - 1][k] <= height:
                    dp[i][j] = blocks[i][j] + dp[i - 1][k]
                # print(dp[i][j], blocks[i][j], dp[i - 1][k])

    print(blocks)
    print(dp)
    count = 0
    for v in dp[-1]:
        if v == height:
            count += 1

    return count


if __name__ == "__main__":
    N, M, H = map(int, input().split())
    blocks = []

    for _ in range(N):
        block = list(map(int, input().split()))
        block.append(0)
        blocks.append(block)

    print(solution(N, M, H, blocks))
