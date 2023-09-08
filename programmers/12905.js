function solution(board) {
  const row = board.length;
  const column = board[0].length;

  let maxLength = board[0][0];

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < column; j++) {
      if (board[i][j] >= 1) {
        const cross = board[i - 1][j - 1];
        const up = board[i - 1][j];
        const left = board[i][j - 1];

        if (cross >= 1 && up >= 1 && left >= 1) {
          board[i][j] = Math.min(cross, up, left) + 1;
        }
        maxLength = Math.max(maxLength, board[i][j]);
      }
    }
  }
  return maxLength ** 2;
}
