import sys
from typing import Dict, List, Set

input = sys.stdin.readline


def solution(edges: Dict[int, List[int]], nodes: Set[int]) -> int:
    # case 1: 루트가 얼리어답터 일때
    first_early_adopters = set([1])

    # case 2: 루트가 얼리어답터가 아닐때
    second_early_adopters = set()
    pass


if __name__ == "__main__":
    N = int(input())
    E = {}
    nodes = set()

    for _ in range(N - 1):
        n1, n2 = map(int, input().split())

        E.setdefault(n1, [])
        E.setdefault(n2, [])

        E[n1].append(n2)
        E[n2].append(n1)
        nodes.add(n1)
        nodes.add(n2)
