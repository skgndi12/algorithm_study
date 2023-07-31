import sys
from typing import Dict
input = sys.stdin.readline


def solution(access_logs: Dict[str, str]):
    cur_workers = [k for k, v in access_logs.items() if v > 0]

    for w in sorted(cur_workers, reverse=True):
        print(w)


if __name__ == "__main__":
    input_num = int(input())
    access_logs = {}

    for _ in range(input_num):
        name, enter_or_leave = input().split()
        if enter_or_leave[0] == 'l':
            access_logs[name] = 0
        else:
            access_logs[name] = 1

    solution(access_logs)
