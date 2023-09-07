class User {
  constructor(id, limit, userMap) {
    this.id = id;
    this.subscribers = new Set();
    this.reportedCount = this.subscribers.size;
    this.resultCount = 0;
    this.blocked = false;
    this.limit = limit;
    this.userMap = userMap;
  }

  getReportedBy = user => {
    this.subscribers.add(user.id);
    this.reportedCount = this.subscribers.size;

    if (this.reportedCount >= this.limit) {
      this.getBlocked();
    }
  };

  getResult = () => {
    this.resultCount += 1;
  };

  getBlocked = () => {
    if (this.blocked) return;

    this.blocked = true;
  };

  sendResult = () => {
    if (!this.blocked) return;

    for (const subscriber of this.subscribers) {
      this.userMap.get(subscriber).getResult();
    }
  };
}

function solution(id_list, reports, k) {
  const userMap = new Map();
  const reportSet = new Set(reports);

  for (const id of id_list) {
    userMap.set(id, new User(id, k, userMap));
  }

  for (const report of reportSet) {
    const [userId, reportedId] = report.split(' ');

    const user = userMap.get(userId);
    const reported = userMap.get(reportedId);

    reported.getReportedBy(user);
  }

  for (const user of userMap.values()) {
    user.sendResult();
  }

  return [...userMap.values()].map(user => user.resultCount);
}

console.log(
  solution(
    ['muzi', 'frodo', 'apeach', 'neo'],
    ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'],
    2
  )
);

console.log(solution(['con', 'ryan'], ['ryan con', 'ryan con', 'ryan con', 'ryan con'], 3));
