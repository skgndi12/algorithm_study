from typing import List


def solution(keymap: List[str], targets: List[str]) -> List[int]:
    answer = []
    key_dict = {}

    for k in keymap:
        for i, s in enumerate(k):
            if s not in key_dict:
                key_dict[s] = i + 1
            else:
                if i + 1 < key_dict[s]:
                    key_dict[s] = i + 1

    for target in targets:
        click_num = 0
        for s in target:
            if s not in key_dict:
                click_num = -1
                break
            else:
                click_num += key_dict[s]
        answer.append(click_num)

    return answer


print(solution(["ABACD", "BCEFD"], ["ABCD", "AABB"]))
print(solution(["AA"], ["B"]))
print(solution(["AGZ", "BSSS"], ["ASA", "BGZ"]))
