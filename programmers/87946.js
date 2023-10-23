function solution(k, dungeons) {
  const dungeonsLength = dungeons.length;
  const visited = Array(dungeonsLength).fill(false);
  let max = 0;

  function dfs(leftover, cnt) {
    max = Math.max(max, cnt);

    for (let i = 0; i < dungeonsLength; i++) {
      if (visited[i]) continue;
      if (leftover < dungeons[i][0]) continue;

      visited[i] = true;
      dfs(leftover - dungeons[i][1], cnt + 1);
      visited[i] = false;
    }
  }

  dfs(k, 0);

  return max;
}
