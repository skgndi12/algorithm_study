import sys
from typing import List, Tuple
from heapq import *

input = sys.stdin.readline


class Grid:
    def __init__(self, board: List[List[int]]):
        self.dx = [1, -1, 0, 0]
        self.dy = [0, 0, 1, -1]
        self.board = board
        self.board_size = len(self.board)

    def get_min_change_count(self) -> int:
        heap = [(0, 0, 0)]
        heapify(heap)

        return self.bfs(heap)

    def bfs(self, heap: List[Tuple[int, int, int]]) -> int:
        visited = [[False] * self.board_size for _ in range(self.board_size)]

        while heap:
            cur_count, cur_x, cur_y = heappop(heap)

            if cur_x == self.board_size - 1 and cur_y == self.board_size - 1:
                return cur_count

            for i in range(4):
                next_x = cur_x + self.dx[i]
                next_y = cur_y + self.dy[i]

                if not (0 <= next_x < self.board_size) or not (0 <= next_y < self.board_size):
                    continue

                if visited[next_x][next_y]:
                    continue

                visited[next_x][next_y] = True
                # white
                if self.board[next_x][next_y] > 0:
                    heappush(heap, (cur_count, next_x, next_y))
                # black
                else:
                    heappush(heap, (cur_count + 1, next_x, next_y))


if __name__ == "__main__":
    N = int(input())
    B = [[0] * N for _ in range(N)]

    for i in range(N):
        row = input().rstrip()
        for j, v in enumerate(row):
            B[i][j] = int(v)

    grid = Grid(B)
    print(grid.get_min_change_count())
