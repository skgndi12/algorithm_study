import sys
from typing import List, Tuple
input = sys.stdin.readline


class UnionFind:
    def __init__(self, vertex_num: int):
        self.vertex_num = vertex_num
        self.root_table = [i for i in range(self.vertex_num)]

    def union(self, source: int, target: int):
        source = self.find(source)
        target = self.find(target)

        if self.root_table[source] < self.root_table[target]:
            self.root_table[target] = source
        else:
            self.root_table[source] = target

    def find(self, target: int) -> int:
        if self.root_table[target] != target:
            self.root_table[target] = self.find(self.root_table[target])
        return self.root_table[target]


class Grid:
    def __init__(self, vertex_num: int, edges: List[Tuple[int, int, int]]):
        self.vertex_num = vertex_num
        self.union_find = UnionFind(vertex_num)
        self.edges = sorted(edges, key=lambda x: x[2])

    def get_mst_cost(self) -> int:
        total_cost = 0

        for [node1, node2, cost] in self.edges:
            if self.union_find.find(node1) != self.union_find.find(node2):
                total_cost += cost
                self.union_find.union(node1, node2)

        return total_cost


if __name__ == '__main__':
    N = int(input())
    M = int(input())

    edges = []
    for _ in range(M):
        n1, n2, cost = map(int, input().split())
        edges.append((n1 - 1, n2 - 1, cost))

    grid = Grid(N, edges)
    print(grid.get_mst_cost())
