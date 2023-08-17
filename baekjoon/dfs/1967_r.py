import sys
from typing import Dict, List, Set
input = sys.stdin.readline
sys.setrecursionlimit(10**6)


class Grid:
    def __init__(self, edges: Dict[int, List[int]]):
        self.edges = edges
        self.max_cost = -sys.maxsize
        self.max_node = 0

    def get_tree_diameter(self) -> int:
        if 1 not in self.edges:
            return 0

        self.dfs_recursion(1, 0, set([]))

        self.dfs_recursion(self.max_node, 0, set([]))

        return self.max_cost

    def dfs_recursion(self, cur_node: int, cost: int, visited: Set[int]):
        visited.add(cur_node)

        if self.max_cost < cost:
            self.max_node = cur_node
            self.max_cost = cost

        for [next_node, next_weight] in self.edges[cur_node]:
            if next_node in visited:
                continue

            self.dfs_recursion(next_node, cost + next_weight, visited)

    def dfs_stack(self, cur_node: int, cur_cost: int, visited: Set[int]):
        visited = set()
        stack = [(cur_node, 0)]

        while stack:
            cur_node, cur_cost = stack.pop()

            if self.max_cost < cur_cost:
                self.max_node = cur_node
                self.max_cost = cur_cost

            visited.add(cur_node)

            for [next_node, next_weight] in self.edges[cur_node]:
                if next_node in visited:
                    continue
                stack.append((next_node, cur_cost + next_weight))


if __name__ == '__main__':
    N = int(input())
    E = {}

    for _ in range(N - 1):
        n1, n2, w = map(int, input().split())

        E.setdefault(n1, [])
        E.setdefault(n2, [])

        E[n1].append((n2, w))
        E[n2].append((n1, w))

    grid = Grid(E)
    print(grid.get_tree_diameter())
