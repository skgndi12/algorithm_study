import sys
from typing import List
from collections import deque

input = sys.stdin.readline


class Grid:
    def __init__(self, board: List[List[int]]):
        self.board = board
        self.row = len(self.board)
        self.col = len(self.board[0])
        self.walls = set()

        # 짝수
        # 0, y - 1
        # 0, y + 1
        # x - 1, y + 1
        # x - 1, 0
        # x + 1, 0
        # x + 1, y + 1
        self.dx_odd = [0, 0, -1, -1, 1, 1]
        self.dy_odd = [-1, 1, 1, 0, 0, 1]

        # 홀수
        # x - 1, 0
        # 0, y - 1
        # 0, y + 1
        # x - 1, y - 1
        # x + 1, y - 1
        # x + 1, 0
        self.dx_even = [-1, 0, 0, -1, 1, 1]
        self.dy_even = [0, -1, 1, -1, -1, 0]

    def get_length_of_outer_wall(self):
        self.visited = [[False] * len(board[0]) for _ in range(len(board))]
        self.bfs()
        print(len(self.walls))

    def bfs(self):
        queue = deque([])
        queue.append((0, 0))

        while queue:
            cur_x, cur_y = queue.popleft()

            if self.visited[cur_x][cur_y]:
                continue

            self.visited[cur_x][cur_y] = True

            for i in range(0, 6):
                if cur_x % 2 == 0:
                    next_x = cur_x + self.dx_even[i]
                    next_y = cur_y + self.dy_even[i]
                else:
                    next_x = cur_x + self.dx_odd[i]
                    next_y = cur_y + self.dy_odd[i]

                if not (0 <= next_x < self.row) or not (0 <= next_y < self.col):
                    continue

                if self.visited[next_x][next_y]:
                    continue

                if self.board[cur_x][cur_y] <= 0 and self.board[next_x][next_y] > 0:
                    self.walls.add((cur_x, cur_y, next_x, next_y))

                if self.board[next_x][next_y] > 0:
                    continue

                queue.append((next_x, next_y))


if __name__ == "__main__":
    col, row = map(int, input().split())
    board = [[0] * (col + 2) for _ in range(row + 2)]

    for i in range(1, row + 1):
        line = list(map(int, input().split()))
        board[i][1:-1] = line

    grid = Grid(board)
    grid.get_length_of_outer_wall()
