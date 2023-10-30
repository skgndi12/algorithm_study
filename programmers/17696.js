function formatTime(time) {
  const [h, m] = time.split(':');

  return 60 * Number(h) + Number(m);
}

function solution(plans) {
  const answer = [];
  const suspended = [];

  let lastPlaying;

  const formattedPlans = plans.map(v => [v[0], formatTime(v[1]), Number(v[2])]);
  formattedPlans.sort((a, b) => a[1] - b[1]);

  for (const [name, start, playTime] of formattedPlans) {
    if (!lastPlaying) {
      lastPlaying = [name, start, playTime]; // initialize
      continue;
    }

    if (start === lastPlaying[1] + lastPlaying[2]) {
      answer.push(lastPlaying[0]);
    } else if (start > lastPlaying[1] + lastPlaying[2]) {
      answer.push(lastPlaying[0]);

      while (suspended.length > 0) {
        const [susName, leftOver] = suspended.pop();
        // [a, 20]
        // [b, 30]
        // [c, 50]
        // [d, 10]
        console.log(susName, leftOver, start, lastPlaying[1], lastPlaying[2]);

        if (start >= leftOver + lastPlaying[1] + lastPlaying[2]) {
          //  750 >    20 + 650 (670)
          //  750 >    30 + 670 (700)
          //  750 >=   50 + 700 (750)
          answer.push(susName);
          lastPlaying = [susName, lastPlaying[1] + lastPlaying[2], leftOver];
        } else {
          // lastPlaying = [susName, start, leftOver - (start - lastPlaying[1])]
          console.log(leftOver - (start - lastPlaying[1]));

          suspended.push([susName, leftOver - (start - lastPlaying[1])]);
          break;
        }
      }
    } else {
      suspended.push([lastPlaying[0], lastPlaying[2] - (start - lastPlaying[1])]);
    }

    lastPlaying = [name, start, playTime];
  }

  answer.push(lastPlaying[0]);
  while (suspended.length > 0) {
    const [name, _] = suspended.pop();
    answer.push(name);
  }

  return answer;
}
