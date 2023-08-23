import sys

input = sys.stdin.readline


def solution(string: str) -> int:
    base = 0
    8 or 16
    if string[0] == "0":
        # 16
        if string[1] == "x":
            base = 16
        # 8
        else:
            base = 8
    # 10
    else:
        base = 10

    return int(string, base)


if __name__ == "__main__":
    X = input().rstrip()

    print(solution(X))
