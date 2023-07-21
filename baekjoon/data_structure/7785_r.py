import sys
from typing import Dict
input = sys.stdin.readline


def solution(access_log: Dict[str, int]):
    cur_entered_workers = [k for k, v in access_log.items() if v > 0]

    for w in sorted(cur_entered_workers, reverse=True):
        print(w)


if __name__ == '__main__':
    input_num = int(input())
    access_log = {}

    for _ in range(input_num):
        name, enter_or_leave = input().split()
        if enter_or_leave[0] == 'l':
            access_log[name] = 0
        else:
            access_log[name] = 1

    solution(access_log)
