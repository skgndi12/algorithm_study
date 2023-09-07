from collections import deque
from typing import List, Tuple


def solution(maps: List[str]) -> List[int]:
    answer = []
    visited = [[False] * len(maps[0]) for _ in range(len(maps))]

    for i in range(len(maps)):
        for j in range(len(maps[0])):
            if maps[i][j] != "X" and visited[i][j] is not True:
                answer.append(bfs(maps, visited, (i, j)))

    if len(answer) <= 0:
        return [-1]

    answer.sort()
    return answer


def bfs(maps: List[str], visited: List[List[bool]], start: Tuple[int, int]) -> int:
    queue = deque([start])
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]
    food_cnt = 0
    visited[start[0]][start[1]] = True

    while queue:
        cur_x, cur_y = queue.popleft()
        food_cnt += int(maps[cur_x][cur_y])

        for i in range(4):
            next_x = cur_x + dx[i]
            next_y = cur_y + dy[i]

            if not (0 <= next_x < len(maps)) or not (0 <= next_y < len(maps[0])):
                continue
            if maps[next_x][next_y] == "X":
                continue
            if visited[next_x][next_y]:
                continue

            visited[next_x][next_y] = True
            queue.append((next_x, next_y))

    return food_cnt


print(solution(["X591X", "X1X5X", "X231X", "1XXX1"]))
