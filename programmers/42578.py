from typing import List
from functools import reduce


def solution(clothes: List[List[int]]) -> int:
    answer = 0
    cloth_dict = {}

    for [cloth, category] in clothes:
        cloth_dict.setdefault(category, [])
        cloth_dict[category].append(cloth)

    cloth_kinds = []
    for k in cloth_dict.keys():
        cloth_kinds.append(len(cloth_dict[k]) + 1)

    answer += reduce(lambda a, b: a * b, cloth_kinds) - 1
    return answer
