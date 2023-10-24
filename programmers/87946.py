from typing import List
from itertools import permutations


def solution(k: int, dungeons: List[List[int]]) -> int:
    answer = 0
    dungeon_tuples = []

    for d in dungeons:
        dungeon_tuples.append((d[0], d[1]))

    dungeon_perms = permutations(dungeon_tuples)

    for dp in dungeon_perms:
        cur_d = 0
        cur_k = k
        for d in dp:
            if cur_k < d[0]:
                break
            else:
                cur_d += 1
                cur_k -= d[1]

        if answer < cur_d:
            answer = cur_d

    return answer
