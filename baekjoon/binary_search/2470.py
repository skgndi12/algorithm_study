import heapq
import sys
from typing import List, Tuple
input = sys.stdin.readline


def solution(liquids: List[int]) -> Tuple[int, int]:
    heap = []
    liquids.sort(key=lambda x: x)

    for i, l in enumerate(liquids):
        a = binary_search(-l, liquids[i + 1:])

        if l > a:
            heapq.heappush(heap, (abs(l + a), a, l))
        else:
            heapq.heappush(heap, (abs(l + a), l, a))

    print(heap)
    return heap[0][1:]


def binary_search(target: int, source: List[int]) -> int:
    low, mid, high, best_sum = 0, 0, len(source), 0

    while low < high:
        mid = (low + high) // 2
        best_sum = source[mid]

        if source[mid] < target:
            low = mid + 1
        elif source[mid] > target:
            high = mid - 1
        elif source[mid] == target:
            return source[mid]

    print(target, source[mid])
    return best_sum


if __name__ == '__main__':
    N = int(input())
    M = list(map(int, input().split()))
    answer = solution(M)
    print(''.join([str(i) + ' ' for i in answer]))
