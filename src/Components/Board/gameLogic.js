export const checkWinner = (board, row, col, piece) => {
  const directions = [
    { row: 0, col: 1 }, // Horizontal
    { row: 1, col: 0 }, // Vertical
    { row: 1, col: 1 }, // Diagonal de baixo para cima
    { row: 1, col: -1 }, // Diagonal de cima para baixo
  ];

  for (const { row: dRow, col: dCol } of directions) {
    let count = 1; // Conta a peça recem colocada
    // Conta as peças iguais na direção positiva e negativa
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

  // Conta as peças numa direção especifica
  while (
    r >= 0 &&
    r < board.length &&
    c >= 0 &&
    c < board[0].length &&
    board[r][c] === piece
  ) {
    count++;
    r += dRow;
    c += dCol;
  }

  return count;
};

export const isBoardFull = (board) => board[0].every((cell) => cell !== null);
