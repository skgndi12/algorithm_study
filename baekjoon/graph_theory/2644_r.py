import sys
from typing import Dict, List
input = sys.stdin.readline


class Grid:
    def __init__(self, tree: Dict[int, List[int]]):
        self.tree = tree
        self.visited = set()

    def execute(self, node1: int, node2: int) -> int:
        result = self.dfs(n1, n2, 0)
        return result if n2 in self.visited else -1

    def dfs(self, cur_node: int, target: int, count: int):
        self.visited.add(cur_node)

        if cur_node == target:
            self.visited.add(target)
            return count

        for next_node in tree[cur_node]:
            if next_node not in self.visited:
                result = self.dfs(next_node, target, count + 1)
                if result:
                    return result


if __name__ == '__main__':
    n = int(input())
    n1, n2 = map(int, input().split())

    tree = {}
    m = int(input())
    for _ in range(m):
        node1, node2 = map(int, input().split())

        tree.setdefault(node1, [])
        tree.setdefault(node2, [])

        tree[node1].append(node2)
        tree[node2].append(node1)

    grid = Grid(tree)
    print(grid.execute(n1, n2))
