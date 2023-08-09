import sys
from typing import Dict, List
input = sys.stdin.readline

# 말단 노드들에 대해서만 계산하게끔 계산


def solution(node_num: int, edges: Dict[int, List[int]]) -> int:
    board = [[sys.maxsize for _ in range(node_num)] for _ in range(node_num)]

    for n1 in edges.keys():
        for [n2, w] in edges[n1]:
            board[n1][n2] = w
            board[n2][n1] = w

    answer = 0
    for k in range(node_num):
        for i in range(node_num):
            for j in range(node_num):
                if board[i][k] + board[k][j] < board[i][j]:
                    board[i][j] = board[i][k] + board[k][j]

    for i in range(node_num):
        for j in range(node_num):
            if board[i][j] > answer:
                answer = board[i][j]

    return answer


if __name__ == '__main__':
    N = int(input())

    edges = {}
    for _ in range(N - 1):
        n1, n2, w = map(int, input().split())

        edges.setdefault(n1 - 1, [])
        edges.setdefault(n2 - 1, [])

        edges[n1 - 1].append((n2 - 1, w))
        edges[n2 - 1].append((n1 - 1, w))

    print(solution(N, edges))
