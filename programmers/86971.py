from collections import deque
from typing import Dict, List
import sys


def solution(n: int, wires: List[List[int]]) -> int:
    answer = sys.maxsize
    tree = dict()

    for [n1, n2] in wires:
        tree.setdefault(n1, [])
        tree.setdefault(n2, [])

        tree[n1].append(n2)
        tree[n2].append(n1)

    for [n1, n2] in wires:
        first = bfs(tree, n1, n2)
        second = bfs(tree, n2, n1)
        diff = abs(first - second)

        if answer > diff:
            answer = diff

    return answer


def bfs(tree: Dict[int, List[int]], start: int, end: int) -> int:
    queue = deque([start])
    visited = [False] * (len(tree.keys()) + 1)
    cnt = 1

    while queue:
        cur_node = queue.popleft()
        visited[cur_node] = True
        cnt += 1

        for next_node in tree[cur_node]:
            if visited[next_node]:
                continue
            if next_node == end:
                continue

            queue.append(next_node)

    return cnt


print(solution(9, [[1, 3], [2, 3], [3, 4], [4, 5], [4, 6], [4, 7], [7, 8], [7, 9]]))
print(solution(4, [[1, 2], [2, 3], [3, 4]]))
print(solution(7, [[1, 2], [2, 7], [3, 7], [3, 4], [4, 5], [6, 7]]))
