import sys
from typing import List

input = sys.stdin.readline


def solution(board: List[List[int]]) -> int:
    operated_board = board.copy()

    while len(operated_board) > 1:
        operated_board = pooling(operated_board)

    return operated_board[0][0]


def pooling(board: List[List[int]]) -> List[List[int]]:
    operated_board = []

    for i in range(0, len(board), 2):
        row = []
        for j in range(0, len(board), 2):
            row.append(get_second_max_item([board[k][i : i + 2] for k in range(j, j + 2)]))
        operated_board.append(row)

    return operated_board


def get_second_max_item(board: List[List[int]]) -> int:
    return sorted([board[0][0], board[0][1], board[1][0], board[1][1]], reverse=True)[1]


if __name__ == "__main__":
    N = int(input())

    B = []
    for _ in range(N):
        B.append(list(map(int, input().split())))

    print(solution(B))
