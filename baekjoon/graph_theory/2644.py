import sys
from typing import Dict, List
input = sys.stdin.readline
sys.setrecursionlimit(10**6)


class Grid:
    def __init__(self, graph: Dict[int, List[int]]):
        self.graph = graph
        self.visited = set()

    def execute(self, node1: int, node2: int) -> int:
        result = self.dfs(node1, node2, 1)
        return -1 if node2 not in self.visited else result

    def dfs(self, cur: int, target: int, cnt: int) -> int:
        if cur == target:
            return cnt

        self.visited.add(cur)

        for next_node in graph[cur]:

            if next_node == target:
                return cnt + 1

            if next_node not in self.visited:
                return self.dfs(next_node, target, cnt + 1)


if __name__ == '__main__':
    n = int(input())
    a, b = map(int, input().split())

    graph = {}
    m = int(input())
    for _ in range(m):
        p, c = map(int, input().split())

        graph.setdefault(p, [])
        graph.setdefault(c, [])

        graph[p].append(c)
        graph[c].append(p)

    grid = Grid(graph)
    print(grid.execute(a, b))
