from sys import stdin
from typing import List


def solution(string: str):
    stack = []

    for s in string:
        if s == "(":
            stack.append(s)
        elif s == ")":
            if validate("(", stack):
                stack.pop()
                continue
            else:
                print("no")
                return

        elif s == "[":
            stack.append(s)
        elif s == "]":
            if validate("[", stack):
                stack.pop()
                continue
            else:
                print("no")
                return

    if len(stack) <= 0:
        print("yes")
    else:
        print("no")


def validate(target_bracket: chr, stack: List[chr]) -> bool:
    if len(stack) <= 0:
        return False

    if stack[-1] != target_bracket:
        return False

    return True


if __name__ == "__main__":
    for line in stdin:
        if line == ".\n" or line == ".":
            break
        string = []
        for s in line:
            if s == "(" or s == ")" or s == "[" or s == "]":
                string.append(s)
        solution(string)
