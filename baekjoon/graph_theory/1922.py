import sys
from typing import Dict, List, Tuple, Union
input = sys.stdin.readline


class Toplogy:
    def __init__(self, edge_num: int, edges: Dict[int, List[Tuple[int, int]]]):
        self.edge_num = edge_num
        self.edges = edges
        self.visited = [False] * edge_num

    def getMinCost(self) -> int:
        answer = 0
        for _ in range(self.edge_num):
            try:
                if False in self.visited:
                    node = self.visited.index(False)
                    cost_candis = []
                    self.dfs(node, cost_candis)
                    answer += min(cost_candis)
            except ValueError:
                break

        return answer

    def dfs(self, cur_node: int, costs: List[int]) -> Union[int, None]:
        self.visited[cur_node] = True

        for [next_node, weight] in self.edges[cur_node]:
            if next_node == cur_node:
                continue

            if self.visited[next_node] is not True:
                self.dfs(next_node, costs)
                costs.append(weight)


if __name__ == '__main__':
    N = int(input())
    M = int(input())
    edges = {}

    for _ in range(M):
        n1, n2, w = map(int, input().split())

        edges.setdefault(n1 - 1, [])
        edges.setdefault(n2 - 1, [])
        edges[n1 - 1].append((n2 - 1, w))
        edges[n2 - 1].append((n1 - 1, w))

    toplogy = Toplogy(N, edges)
    print(toplogy.getMinCost())
