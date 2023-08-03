import sys
from typing import List, Tuple
input = sys.stdin.readline


def solution(liquids: List[int]) -> Tuple[int, int]:
    liquids.sort(key=lambda x: x)
    best_sum, liquid1, liquid2, start, end = sys.maxsize, 0, 0, 0, len(
        liquids) - 1

    while start < end:
        cur_sum = (liquids[start] + liquids[end])

        if abs(cur_sum) < best_sum:
            best_sum = abs(cur_sum)
            liquid1, liquid2 = liquids[start], liquids[end]

        if cur_sum < 0:
            start += 1
        elif cur_sum > 0:
            end -= 1
        else:
            break

    return liquid1, liquid2


if __name__ == '__main__':
    N = int(input())
    A = list(map(int, input().split()))

    a, b = solution(A)
    print(a, b)
