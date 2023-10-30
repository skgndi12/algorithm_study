from typing import Deque, List, Tuple
from collections import deque
from heapq import heappush, heappop


def solution(plans: List[List[str]]) -> List[str]:
    result = []
    stack = deque([])
    heap = []
    for p in plans:
        heappush(heap, (get_minutes(p[1]), p[0], int(p[2])))

    while heap:
        cur_time, cur_plan, cur_res = heappop(heap)

        if len(heap) <= 0:
            result.append(cur_plan)
            break

        next_time, _, _ = heap[0]

        if (cur_time + cur_res) > next_time:
            stack.append((cur_plan, (cur_time + cur_res) - next_time))
        else:
            result.append(cur_plan)
            handle_unfinished_plan(next_time - (cur_time + cur_res), stack, result)

    while stack:
        result.append(stack.pop()[0])

    return result


def get_minutes(time: str) -> int:
    return int(time[:2]) * 60 + int(time[3:])


def handle_unfinished_plan(remain_res: int, stack: Deque[Tuple[str, int]], result: List[str]):
    while remain_res > 0 and stack:
        cur_plan, cur_res = stack.pop()

        if cur_res <= remain_res:
            remain_res -= cur_res
            result.append(cur_plan)
        else:
            stack.append((cur_plan, (cur_res - remain_res)))
            break


print(
    solution(
        [
            ["science", "12:40", "50"],
            ["music", "12:20", "40"],
            ["history", "14:00", "30"],
            ["computer", "12:30", "100"],
        ]
    )
)
