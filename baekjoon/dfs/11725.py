import sys
from typing import Dict
input = sys.stdin.readline
sys.setrecursionlimit(10**6)


class Tree:
    def __init__(self, edges: Dict[int, int]):
        self.edges = edges
        self.tree = set()
        self.visited = set()

    def execute(self):
        self.dfs(1, edges)

        for _, p in sorted(self.tree, key=lambda x: x[0]):
            print(p)

    def dfs(self, cur: int, edges: Dict[int, int]):
        self.visited.add(cur)

        for c in edges[cur]:
            if c not in self.visited:
                self.tree.add((c, cur))
                self.dfs(c, edges)


if __name__ == "__main__":
    node_num = int(input())
    edges = {}

    for _ in range(node_num - 1):
        node1, node2 = map(int, input().split())
        if node1 in edges:
            edges[node1].append(node2)
        else:
            edges[node1] = [node2]

        if node2 in edges:
            edges[node2].append(node1)
        else:
            edges[node2] = [node1]

    tree = Tree(edges)
    tree.execute()
