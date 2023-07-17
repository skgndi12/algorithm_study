from typing import Set
import sys
input = sys.stdin.readline


def solution(a_cds: Set[int], b_cds: Set[int]):
    cnt = 0
    if len(a_cds) <= len(b_cds):
        for c in a_cds:
            if c in b_cds:
                cnt += 1
    else:
        for c in b_cds:
            if c in a_cds:
                cnt += 1

    print(cnt)


if __name__ == "__main__":
    while True:
        N, M = map(int, input().split())
        cnt = 0

        if N == 0 and M == 0:
            break

        first_case = set()
        for _ in range(N):
            first_case.add(int(input()))

        second_case = set()
        for _ in range(M):
            second_case.add(int(input()))

        solution(first_case, second_case)
