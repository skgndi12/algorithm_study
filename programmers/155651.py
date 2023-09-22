from heapq import heappop, heappush
from typing import List


def solution(book_time: List[List[str]]) -> int:
    book_minutes = []

    for t in book_time:
        book_minutes.append((convert_time_to_min(t[0]), convert_time_to_min(t[1])))

    book_minutes.sort(key=lambda x: x[0])

    room = []
    for s in book_minutes:
        if len(room) <= 0:
            heappush(room, s[1])
            continue

        if s[0] >= room[0] + 10:
            heappop(room)

        heappush(room, s[1])

    return len(room)


def convert_time_to_min(time: str) -> int:
    hour, minute = map(int, time.split(":"))
    return hour * 60 + minute


print(
    solution(
        [
            ["15:00", "17:00"],
            ["16:40", "18:20"],
            ["14:20", "15:20"],
            ["14:10", "19:20"],
            ["18:20", "21:20"],
        ]
    )
)
print(solution([["09:10", "10:10"], ["10:20", "12:20"]]))
