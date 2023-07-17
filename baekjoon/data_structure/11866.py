from collections import deque


def solution(q_size: int, target_order: int):
    queue = deque([i for i in range(1, q_size + 1)])
    seq = []

    while queue:
        cnt = 1
        item = 0
        while True:
            item = queue.popleft()

            if cnt == target_order:
                break

            queue.append(item)
            cnt += 1
        seq.append(item)

    answer = ', '.join([str(i) for i in seq])
    print(f'<{answer}>')


if __name__ == "__main__":
    k, n = map(int, input().split())
    solution(k, n)
