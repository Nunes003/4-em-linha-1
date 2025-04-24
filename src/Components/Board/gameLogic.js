export const checkWinner = (board, row, col, piece) => {
    const directions = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: -1 },
    ];
  
    for (const { row: dRow, col: dCol } of directions) {
      let count = 1;
      count += countInDirection(board, row, col, dRow, dCol, piece);
      count += countInDirection(board, row, col, -dRow, -dCol, piece);
      if (count >= 4) return true;
    }
  
    return false;
  };
  
  export const countInDirection = (board, row, col, dRow, dCol, piece) => {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;
  
    while (r >= 0 && r < board.length && c >= 0 && c < board[0].length && board[r][c] === piece) {
      count++;
      r += dRow;
      c += dCol;
    }
  
    return count;
  };
  
  export const isBoardFull = (board) => board[0].every((cell) => cell !== null);
  