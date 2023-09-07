from typing import List


def solution(n: int, k: int) -> List[int]:
    nums = [i + 1 for i in range(n)]
    factorial = [1]
    answer = []

    for i in range(1, n):
        factorial.append((factorial[i - 1] * i))

    while n >= 1:
        answer.append(nums[(k - 1) // factorial[n - 1]])
        nums.remove(nums[(k - 1) // factorial[n - 1]])
        k %= factorial[n - 1]
        n -= 1

    return answer


print(solution(4, 5))
