import sys
from typing import List, Set
input = sys.stdin.readline


def solution(refs: Set[str], targets: List[str]) -> int:
    count = 0

    for target in targets:
        if target in refs:
            count += 1

    return count


if __name__ == "__main__":
    N, M = map(int, input().split())
    S, R = set(), []

    for _ in range(N):
        S.add(input())

    for _ in range(M):
        R.append(input())

    print(solution(S, R))
