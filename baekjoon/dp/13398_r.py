import sys
from typing import List

input = sys.stdin.readline


def solution(n: int, nums: List[int]):
    dp = [[nums[0]] * n for _ in range(2)]
    dp[0][0] = nums[0]

    for i in range(1, n):
        dp[0][i] = max(dp[0][i - 1] + nums[i], nums[i])
        dp[1][i] = max(dp[1][i - 1] + nums[i], dp[0][i - 1])

    print(max(max(dp[0]), max(dp[1])))


if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    solution(n, nums)
