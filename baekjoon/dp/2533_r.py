import sys
from typing import Dict, List

input = sys.stdin.readline
sys.setrecursionlimit(10**6)


def solution(edges: Dict[int, List[int]]) -> int:
    visited = [False] * 1000001
    dp = [[0] * 2 for _ in range(1000001)]

    tree_dp(1, edges, dp, visited)

    return min(dp[1][0], dp[1][1])


def tree_dp(
    parent_node: int, edges: Dict[int, List[int]], dp: List[List[int]], visited: List[bool]
):
    visited[parent_node] = True
    dp[parent_node][0] = 1

    for child_node in edges[parent_node]:
        if visited[child_node] is False:
            tree_dp(child_node, edges, dp, visited)
            dp[parent_node][0] += min(dp[child_node][0], dp[child_node][1])
            dp[parent_node][1] += dp[child_node][0]


if __name__ == "__main__":
    N = int(input())
    E = {}

    for _ in range(N - 1):
        n1, n2 = map(int, input().split())

        E.setdefault(n1, [])
        E.setdefault(n2, [])

        E[n1].append(n2)
        E[n2].append(n1)

    print(solution(E))
