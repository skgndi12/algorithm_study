import sys
from collections import deque
input = sys.stdin.readline

def solution(emoji_num: int) -> int:
    queue = deque([(1, 0, 0)])
    visited = [[False] * 1001 for _ in range(1001)]

    while queue:
        cur_screen, cur_clipboard, cur_cnt = queue.popleft()

        if cur_screen == emoji_num:
            return cur_cnt

        for i in range(3):
            # 복사
            if i == 0:
                next_screen, next_clipboard, next_cnt = cur_screen, cur_screen, cur_cnt + 1
            # 붙여넣기
            elif i == 1:
                next_screen, next_clipboard, next_cnt = cur_screen + cur_clipboard, cur_clipboard, cur_cnt + 1
            # 삭제
            else:
                next_screen, next_clipboard, next_cnt = cur_screen - 1, cur_clipboard, cur_cnt + 1


            if not (0 <= next_screen <= 1000) or not (0 <= next_clipboard <= 1000):
                continue

            if visited[next_screen][next_clipboard]:
                continue

            visited[next_screen][next_clipboard] = True
            queue.append((next_screen, next_clipboard, next_cnt))


    

if __name__ == '__main__':
    S = int(input())
    print(solution(S))