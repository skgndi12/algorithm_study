import sys
import re

input = sys.stdin.readline


def solution(string: str) -> int:
    nums = []
    cur_num = "0"
    for s in string:
        if s.isnumeric():
            cur_num += s
        else:
            nums.append(int(cur_num))
            cur_num = "0"

    return sum(nums)


def solution_regex(string: str) -> int:
    nums = list(map(int, re.findall("\d+", string)))
    return sum(nums)


if __name__ == "__main__":
    _ = int(input())
    S = input()

    print(solution(S))
