from typing import List


def solution(id_list: List[str], report: List[str], k: int) -> int:
    answer = [0] * len(id_list)
    id_dict = {k: v for (v, k) in enumerate(id_list)}
    reported_dict = {}

    # 신고 당한  사람, 신고한 사람 매핑
    for r in report:
        reporting, reported = r.split()

        reported_dict.setdefault(reported, set())
        reported_dict[reported].add(reporting)

    # 신고 당한 횟수 k 보다 큰 지 확인해서 신고한 사람들 알림 횟수 올리기
    for reported in reported_dict.keys():
        if len(reported_dict[reported]) >= k:
            for reporting in reported_dict[reported]:
                answer[id_dict[reporting]] += 1

    return answer


print(
    solution(
        ["muzi", "frodo", "apeach", "neo"],
        ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
        2,
    )
)

print(solution(["con", "ryan"], ["ryan con", "ryan con", "ryan con", "ryan con"], 3))
