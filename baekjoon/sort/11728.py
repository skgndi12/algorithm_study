from collections import deque
import sys
from typing import Deque

input = sys.stdin.readline


def solution(a: Deque[int], b: Deque[int]) -> int:
    answer = []
    while a and b:
        a_item = a[0]
        b_item = b[0]

        if a_item < b_item:
            answer.append(a_item)
            a.popleft()
        elif a_item > b_item:
            answer.append(b_item)
            b.popleft()
        else:
            answer.append(a_item)
            answer.append(b_item)
            a.popleft()
            b.popleft()

    if a:
        for v in a:
            answer.append(v)
    elif b:
        for v in b:
            answer.append(v)

    return answer


if __name__ == "__main__":
    _, _ = map(int, input().split())

    A = deque(list(map(int, input().split())))
    B = deque(list(map(int, input().split())))

    result = solution(A, B)
    print(" ".join([str(v) for v in result]))

    # print(" ".join(sorted(sys.stdin.read().split(), key=int)))
