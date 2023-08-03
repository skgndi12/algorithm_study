import sys
from typing import List
input = sys.stdin.readline


def solution(num: int) -> List[str]:
    result = ['' for _ in range(8)]
    result[0] = '**** ****'
    for i in range(1, 2):
        for j in range(3):
            length = len(result[i - 1])
            step = length // 3
            if j == 1:
                result[i] += result[i - 1][:step] + \
                    ((' ' * 3) * step) * 3 + result[i - 1][:step]
                pass
            else:
                result[i] += result[i - 1][:step] * 3 + result[i -
                                                               1][step: step * 2] * 3 + result[i - 1][:step] * 3

    print('\n'.join([str(v) if i %
          9 != 8 else '\n' for i, v in enumerate(result[1])]))


if __name__ == '__main__':
    N = int(input())
    solution(N)
