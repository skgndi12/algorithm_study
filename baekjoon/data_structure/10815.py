from typing import List


def solution(card_pool: List[int], cards_to_check: List[int]):
    card_set = set(card_pool)
    check_result = [0 for _ in range(len(cards_to_check))]

    for i, c in enumerate(cards_to_check):
        if c in card_set:
            check_result[i] = 1

    print(' '.join([str(i) for i in check_result]))


if __name__ == "__main__":
    card_num = int(input())
    card_pool = list(map(int, input().split()))
    card_check_num = int(input())
    cards_to_check = list(map(int, input().split()))
    solution(card_pool, cards_to_check)
