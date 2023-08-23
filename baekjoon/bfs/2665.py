from collections import deque
import sys
from typing import List
from heapq import *

input = sys.stdin.readline


# first try
# class Grid:
#     def __init__(self, board: List[List[str]]):
#         self.board = board
#         self.board_size = len(self.board)
#         self.dx = [1, 0, -1, 0]
#         self.dy = [0, 1, 0, -1]
#         self.heap = []
#         heapify(self.heap)
#         self.is_checked = set()

#     def get_min_change_count(self) -> int:
#         #  distance, x, y, count
#         heappush(self.heap, (len(self.board) * 2 - 1, 0, 0, 0))
#         self.is_checked.add((0, 0))

#         while self.heap:
#             _, cur_x, cur_y, cur_cnt = heappop(self.heap)

#             if self.bfs(cur_x, cur_y, cur_cnt) is True:
#                 return cur_cnt

#     def bfs(self, x: int, y: int, cnt: int) -> bool:
#         queue = deque([(x, y)])
#         visited = [[False] * self.board_size for _ in range(self.board_size)]

#         while queue:
#             cur_x, cur_y = queue.popleft()

#             if cur_x == self.board_size - 1 and cur_y == self.board_size - 1:
#                 return True

#             is_blocked = True
#             for i in range(4):
#                 next_x = cur_x + self.dx[i]
#                 next_y = cur_y + self.dy[i]

#                 if not (0 <= next_x < self.board_size) or not (0 <= next_y < self.board_size):
#                     continue

#                 if visited[next_x][next_y]:
#                     continue

#                 if self.board[next_x][next_y] == "0":
#                     continue

#                 is_blocked = False
#                 visited[next_x][next_y] = True
#                 queue.append((next_x, next_y))

#             if is_blocked:
#                 for i in range(4):
#                     next_x = cur_x + self.dx[i]
#                     next_y = cur_y + self.dy[i]

#                     if not (0 <= next_x < self.board_size) or not (0 <= next_y < self.board_size):
#                         continue

#                     if self.board[next_x][next_y] == "1":
#                         continue

#                     if (next_x, next_y) in self.is_checked:
#                         continue

#                     self.is_checked.add((next_x, next_y))
#                     heappush(
#                         self.heap,
#                         (
#                             self.get_distance(
#                                 (self.board_size - 1, self.board_size - 1), (next_x, next_y)
#                             ),
#                             next_x,
#                             next_y,
#                             cnt + 1,
#                         ),
#                     )
#         return False

#     def get_distance(self, ref: Tuple[int, int], target: Tuple[int, int]) -> int:
#         return abs((ref[0] - target[0]) + (ref[1] - target[1]) + 1)


# second try
class Grid:
    def __init__(self, board: List[List[str]]):
        self.board = board
        self.board_size = len(board)
        self.dx = [1, -1, 0, 0]
        self.dy = [0, 0, 1, -1]

    def get_min_change_count(self) -> int:
        dp = [[sys.maxsize] * self.board_size for _ in range(self.board_size)]
        dp[0][0] = 0
        queue = deque([(0, 0, 0)])

        while queue:
            cur_x, cur_y, cur_cnt = queue.popleft()

            for i in range(4):
                next_x = cur_x + self.dx[i]
                next_y = cur_y + self.dy[i]

                if not (0 <= next_x < self.board_size) or not (0 <= next_y < self.board_size):
                    continue

                # white room
                if self.board[next_x][next_y] == "1" and dp[next_x][next_y] > cur_cnt:
                    dp[next_x][next_y] = cur_cnt
                    queue.append((next_x, next_y, cur_cnt))
                # black room
                if self.board[next_x][next_y] == "0" and dp[next_x][next_y] > cur_cnt + 1:
                    dp[next_x][next_y] = cur_cnt + 1
                    queue.append((next_x, next_y, cur_cnt + 1))

        return dp[self.board_size - 1][self.board_size - 1]


if __name__ == "__main__":
    N = int(input())
    B = []

    for i in range(N):
        row = input()
        B.append(row)

    grid = Grid(B)
    print(grid.get_min_change_count())
