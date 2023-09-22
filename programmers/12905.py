from typing import List


def solution(board: List[List[int]]) -> int:
    answer = 1 if 1 in board[0] else 0
    sides = []

    for i in range(len(board)):
        for j in range(len(board[0])):
            if i == 0 or j == 0:
                continue

            if board[i][j] > 0:
                board[i][j] = min(board[i - 1][j], board[i][j - 1], board[i - 1][j - 1]) + 1
        sides.append(max(board[i]))

    if len(sides) <= 0:
        return answer

    max_side = max(sides)
    return max_side**2
