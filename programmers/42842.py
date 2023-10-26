def solution(brown: int, yellow: int) -> int:
    answer = []
    perimeter = brown + 4
    width = brown + yellow

    # 가로, 세로 길이 후보 정하기
    # 가로, 세로 길이 더한게 둘레가 되니?
    # 가로, 세로 곱한게 넓이가 되니?
    # 가로 * 2 + 세로 * 2 = 둘레

    for row in range(3, perimeter):
        col = (perimeter - 2 * row) // 2

        if row * col == width:
            answer.append(row)
            answer.append(col)
            break

    answer.sort(reverse=True)
    return answer
