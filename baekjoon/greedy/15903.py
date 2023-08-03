import sys
from typing import List
import heapq
input = sys.stdin.readline


def solution(repeat: int, cards: List[int]) -> int:
    heapq.heapify(cards)

    for _ in range(repeat):
        first_card, second_card = heapq.heappop(cards), heapq.heappop(cards)

        card_sum = first_card + second_card
        heapq.heappush(cards, card_sum)
        heapq.heappush(cards, card_sum)

    return sum(cards)


if __name__ == '__main__':
    _, M = map(int, input().split())
    A = list(map(int, input().split()))
    print(solution(M, A))
