import sys
input = sys.stdin.readline


def solution(string: str) -> int:
    # 1. 한 문자로 이루어진 케이스
    ref = string[0] * len(string)
    if ref == string:
        return -1

    # 2. 대칭
    if string == string[::-1]:
        return len(string) - 1

    # 3. 비대칭
    return len(string)


if __name__ == '__main__':
    S = input().rstrip()
    print(solution(S))
