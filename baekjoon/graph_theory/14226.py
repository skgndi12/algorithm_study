import sys
input = sys.stdin.readline


def solution(num: int) -> int:
    dp = [0] * (num + 1)
    dp[1] = 0

    for i in range(2, num + 1):
        # 홀수, 짝수 경우를 나눠서 계산
        if i % 2 == 0:
            dp[i] = dp[i // 2] + 2
        else:
            dp[i] = min((i + dp[i // 2] + 2),)
    pass


if __name__ == '__main__':
    S = int(input())
