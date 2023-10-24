from typing import List
from collections import deque


def solution(begin: str, target: str, words: List[str]) -> int:
    queue = deque([(begin, 0)])
    visited = set([begin])

    if len(begin) != len(target):
        return 0

    if target not in words:
        return 0

    while queue:
        cur_word, cur_repeat = queue.popleft()

        if cur_word == target:
            return cur_repeat

        for i in range(len(target)):
            for word in words:
                if word in visited:
                    continue

                if compare_str(i, cur_word, word):
                    queue.append((word, cur_repeat + 1))
                    visited.add(word)
                else:
                    continue

    return 0


def compare_str(skip_idx: int, src: str, target: str) -> bool:
    for i in range(len(src)):
        if i == skip_idx:
            continue

        if src[i] != target[i]:
            return False
    return True
