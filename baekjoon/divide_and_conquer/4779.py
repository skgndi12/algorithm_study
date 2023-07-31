import sys
from typing import List
input = sys.stdin.readline


def solution(factor: int) -> str:
    total_length = pow(3, factor)
    cantor_set = ['-'] * total_length
    divide_and_exclude(cantor_set, 0, total_length)
    return cantor_set


def divide_and_exclude(cantor_set: List[chr], start: int, end: int):
    if end - start == 1:
        return

    step = (end - start) // 3

    for i in range(start + step, end - step):
        cantor_set[i] = ' '

    divide_and_exclude(cantor_set, start, start + step)
    divide_and_exclude(cantor_set, end - step, end)


if __name__ == '__main__':
    while True:
        try:
            N = int(input().rstrip())
            answer = (solution(N))
            print(''.join([i for i in answer]))
        except EOFError:
            break
        except ValueError:
            break
