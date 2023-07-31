import sys
from typing import Dict, List
input = sys.stdin.readline
sys.setrecursionlimit(10**6)


class Grid:
    def __init__(self, edges: Dict[int, List[int]], edge_num: int):
        self.edges = edges
        self.edge_num = edge_num
        self.node_relations = set()
        self.visited = set()

    def print_parent(self):
        self.dfs(1)

        for p, _ in sorted(self.node_relations, key=lambda x: (x[1])):
            print(p)

    def dfs(self, cur: int):
        self.visited.add(cur)

        for node in self.edges[cur]:
            if node not in self.visited:
                self.node_relations.add((cur, node))
                self.dfs(node)


if __name__ == '__main__':
    edge_num = int(input())
    edges = {}

    for _ in range(edge_num - 1):
        node1, node2 = map(int, input().split())

        edges.setdefault(node1, [])
        edges.setdefault(node2, [])

        edges[node1].append(node2)
        edges[node2].append(node1)

    grid = Grid(edges, edge_num)
    grid.print_parent()
