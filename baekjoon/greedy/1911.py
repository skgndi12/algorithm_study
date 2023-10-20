import sys
import math
from typing import List, Tuple

input = sys.stdin.readline


def solution(plank: int, obstacles: List[Tuple[int, int]]):
    obstacles.sort(key=lambda x: x[0])
    start_uncovered_plank = 0
    answer = 0

    for obs in obstacles:
        if obs[1] < start_uncovered_plank:
            continue

        if obs[0] < start_uncovered_plank:
            obs_len = obs[1] - start_uncovered_plank + 1
            obs_start = start_uncovered_plank
        else:
            obs_len = obs[1] - obs[0] + 1
            obs_start = obs[0]

        plank_num = math.ceil(obs_len / plank)
        start_uncovered_plank = obs_start + plank * plank_num

        answer += plank_num

    print(answer)


if __name__ == "__main__":
    N, L = map(int, input().split())
    M = []
    for _ in range(N):
        s, e = map(int, input().split())
        M.append((s, e - 1))
    solution(L, M)
