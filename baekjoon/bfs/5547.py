import sys
from typing import List
input = sys.stdin.readline


def solution(board: List[List[int]]):
    visited = [[False] * len(board[0]) for _ in range(len(board))]
    pass


def bfs(board: List[List[int]]):
    pass


if __name__ == "__main__":
    col, row = map(int, input().split())
    board = [[] for _ in range(row)]

    for i in range(row):
        board[i] = list(map(int, input().split()))

    solution(board)
