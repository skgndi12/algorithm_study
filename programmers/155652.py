def solution(s: str, skip: str, index: int) -> str:
    answer = ""
    skip_set = set([s for s in skip])

    string = "abcdefghijklmnopqrstuvwxyz"
    filtered_string = ""

    for c in string:
        if c in skip_set:
            continue
        else:
            filtered_string += c

    chr_dict = {}
    for i, c in enumerate(filtered_string):
        chr_dict[c] = i

    for c in s:
        answer += filtered_string[(chr_dict[c] + index) % len(filtered_string)]

    return answer


print(solution("aukks", "wbqd", 5))
