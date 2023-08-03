import sys
input = sys.stdin.readline


def solution(num: int) -> str:
    exp_num = get_exponential_num(3, num)
    asterisks = ['' for _ in range(exp_num)]
    asterisks[0] = '***\n* *\n***\n'

    for i in range(1, exp_num):
        prev_asterisks = asterisks[i - 1].split('\n')[:-1]

        for asterisk in prev_asterisks:
            asterisks[i] += asterisk * 3 + '\n'

        for asterisk in prev_asterisks:
            asterisks[i] += asterisk + (' ' * pow(3, i)) + asterisk + '\n'

        for asterisk in prev_asterisks:
            asterisks[i] += asterisk * 3 + '\n'

    return asterisks[-1]


def get_exponential_num(base: int, source: int) -> int:
    exp_num = 0

    while source > 1:
        source /= base
        exp_num += 1

    return exp_num


if __name__ == '__main__':
    N = int(input())
    print(solution(N))
