import sys
import heapq
from typing import List, Tuple
input = sys.stdin.readline


def solution(schedules: List[Tuple[int, int]]) -> int:
    schedules.sort(key=lambda x: x[0])
    room = []

    for s in schedules:
        if len(room) <= 0:
            heapq.heappush(room, s[1])
            continue

        if s[0] >= room[0]:
            heapq.heappop(room)

        heapq.heappush(room, s[1])

    return len(room)


if __name__ == '__main__':
    n = int(input())
    rows = []

    for _ in range(n):
        s, e = map(int, input().split())
        rows.append((s, e))

    print(solution(rows))
