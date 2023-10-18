import sys
from typing import List

input = sys.stdin.readline


def solution(nums: List[int]) -> int:
    dp = [[0] * len(nums) for _ in range(2)]
    dp[0][0] = nums[0]

    answer = nums[0]
    for i in range(1, len(nums)):
        dp[0][i] = max(dp[0][i - 1] + nums[i], nums[i])
        dp[1][i] = max(dp[1][i - 1] + nums[i], dp[0][i - 1])
        answer = max(answer, max(dp[0][i], dp[1][i]))
    print(answer)


if __name__ == "__main__":
    _ = input()
    nums = list(map(int, input().split()))
    solution(nums)
