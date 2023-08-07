import sys
from typing import List, Tuple
input = sys.stdin.readline


def solution(schedules: List[Tuple[int, int]]) -> int:
    schedules.sort(key=lambda x: (x[1], -x[0]))
    print(schedules)
    cur_profit, cur_day = schedules[0]
    print(cur_profit, cur_day)
    answer = cur_profit

    for next_profit, next_day in schedules[1:]:
        if cur_day < next_day:
            cur_day = next_day
            answer += next_profit
            print(next_profit, next_day)

    return answer


if __name__ == '__main__':
    N = int(input())
    S = []

    for _ in range(N):
        P, D = map(int, input().split())
        S.append((P, D))

    print(solution(S))
