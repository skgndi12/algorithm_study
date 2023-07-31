from typing import List
import sys
input = sys.stdin.readline
print = sys.stdout.write


def solution(targets: List[int], sources: List[int]):
    count = 0

    for target in targets:
        if binary_search(target, sources):
            count += 1

    print(str(count) + '\n')


def binary_search(target: int, sources: List[int]) -> bool:
    low, mid, high = 0, 0, len(sources) - 1

    while low <= high:
        mid = (low + high) // 2

        if sources[mid] < target:
            low = mid + 1
        elif sources[mid] > target:
            high = mid - 1
        else:
            return True

    return False


if __name__ == "__main__":
    while True:
        N, M = map(int, input().split())

        if N == M == 0:
            print(str(N) + str(M))
            break

        first_case = []
        for _ in range(N):
            first_case.append(int(input()))

        second_case = []
        for _ in range(M):
            second_case.append(int(input()))

        if len(first_case) <= len(second_case):
            solution(first_case, second_case)
        else:
            solution(second_case, first_case)
