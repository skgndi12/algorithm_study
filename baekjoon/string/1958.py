import sys
input = sys.stdin.readline


def solution(first: str, second: str, third: str) -> int:
    [longest, mid, shortest] = sorted([first, second, third],
                                      key=lambda x: len(x), reverse=True)
    lcs = [[[0] * len(shortest)] * len(mid) for _ in range(len(longest))]
    print(lcs)
    pass


if __name__ == '__main__':
    M = input().rstrip()
    N = input().rstrip()
    K = input().rstrip()

    print(solution(M, N, K))
