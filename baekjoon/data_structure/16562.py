import sys
from typing import Dict, List, Union
input = sys.stdin.readline
sys.setrecursionlimit(10**6)


class RelationshipCalculator:
    def __init__(self, relation_num: int, relation_cost: List[int], relatoins: Dict[int, List[int]]):
        self.relation_num = relation_num
        self.relation_cost = relation_cost
        self.relations = relatoins
        self.visited = [False] * len(relation_cost)

    def execute(self, budget: int) -> Union[int, str]:
        answer = 0
        for i in self.relations.keys():
            if self.visited[i] is not True:
                cost_candis = []
                self.dfs(i, cost_candis)
                min_cost = min(cost_candis)

                if min_cost > budget:
                    return 'Oh no'
                else:
                    budget -= min_cost
                    answer += min_cost

        for i in range(len(self.visited)):
            if self.visited[i]:
                continue

            if budget >= self.relation_cost[i]:
                self.visited[i] = True
                budget -= self.relation_cost[i]
                answer += self.relation_cost[i]
            else:
                return 'Oh no'

        return answer

    def dfs(self, cur_node: int, cur_costs: List[int]):
        self.visited[cur_node] = True
        cur_costs.append(self.relation_cost[cur_node])

        for next_node in self.relations[cur_node]:
            if self.visited[next_node] is not True:
                self.dfs(next_node, cur_costs)


if __name__ == '__main__':
    N, M, K = map(int, input().split())
    A = list(map(int, input().split()))

    edges = {}
    for _ in range(M):
        v, w = map(int, input().split())

        edges.setdefault(v - 1, [])
        edges.setdefault(w - 1, [])

        edges[v - 1].append(w - 1)
        edges[w - 1].append(v - 1)

    calculator = RelationshipCalculator(M, A, edges)
    print(calculator.execute(K))
