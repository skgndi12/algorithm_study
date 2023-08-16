import sys
from heapq import *
from typing import Dict, List, Tuple
input = sys.stdin.readline


def solution_priority_queue(schedules: List[Tuple[int, int]]) -> int:
    schedules.sort(key=lambda x: (x[1]))
    profits = []
    heapify(profits)

    for [profit, day] in schedules:
        heappush(profits, profit)

        if len(profits) > day:
            heappop(profits)

    return sum(profits)


def solution_greedy(schedules: Dict[int, List[int]]) -> int:
    if not schedules:
        return 0

    last_day = max(schedules.keys())

    heap = []
    answer = 0
    for d in range(last_day, 0, -1):
        if d in schedules:
            for p in schedules[d]:
                heappush(heap, -p)
        if heap:
            answer += -(heappop(heap))

    return answer

if __name__ == '__main__':
    N = int(input())
    # A = []

    # for _ in range(N):
    #     P, D = map(int, input().split())
    #     A.append((P, D))
    # print(solution_priority_queue(A))

    B = {}
    for _ in range(N):
        P, D = map(int, input().split())
        B.setdefault(D, [])
        B[D].append(P)
    print(solution_greedy(B))
