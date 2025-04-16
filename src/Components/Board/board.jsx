import { useState, useEffect } from 'react';

export default function Board({
  mode,
  player1Name,
  player2Name,
  player3Name,
  player1Piece,
  player2Piece,
  player3Piece,
}) {
  const rows = 6;
  const columns = 7;

  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1Piece);
  const [gameover, setGameover] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));
    setBoard(newBoard);
    setCurrentPlayer(player1Piece);
    setGameover(false);
    setWinner(null);
  };

  const handleClick = (colIndex) => {
    if (gameover) return;

    const newBoard = [...board];
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = currentPlayer;

        if (checkWinner(newBoard, row, colIndex, currentPlayer)) {
          setGameover(true);
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(
            mode === '1vs1'
              ? currentPlayer === player1Piece
                ? player2Piece
                : player1Piece
              : currentPlayer === player1Piece
              ? player3Piece
              : player1Piece
          );
        }

        setBoard(newBoard);
        return;
      }
    }
  };

  const checkWinner = (board, row, col, piece) => {
    const directions = [
      { row: 0, col: 1 }, // Horizontal
      { row: 1, col: 0 }, // Vertical
      { row: 1, col: 1 }, // Diagonal (↘)
      { row: 1, col: -1 }, // Diagonal (↙)
    ];

    for (const { row: dRow, col: dCol } of directions) {
      let count = 1;

      // Verificar na direção positiva
      count += countInDirection(board, row, col, dRow, dCol, piece);

      // Verificar na direção negativa
      count += countInDirection(board, row, col, -dRow, -dCol, piece);

      if (count >= 4) return true;
    }

    return false;
  };

  const countInDirection = (board, row, col, dRow, dCol, piece) => {
    let count = 0;
    let r = row + dRow;
    let c = col + dCol;

    while (
      r >= 0 &&
      r < rows &&
      c >= 0 &&
      c < columns &&
      board[r][c] === piece
    ) {
      count++;
      r += dRow;
      c += dCol;
    }

    return count;
  };

  const getPieceClass = (cell) => {
    switch (cell) {
      case 'R':
        return 'red-piece';
      case 'Y':
        return 'yellow-piece';
      case 'G':
        return 'green-piece';
      case 'P':
        return 'purple-piece';
      case 'RGB':
        return 'rainbow-piece';
      default:
        return '';
    }
  };

  return (
    <div className="game-board">
      {gameover && (
        <div className="winner-message">
          {winner === player1Piece
            ? `${player1Name} venceu!`
            : mode === '1vs1'
            ? `${player2Name} venceu!`
            : `${player3Name} venceu!`}
        </div>
      )}
      <div id="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${getPieceClass(cell)}`}
                onClick={() => handleClick(colIndex)}></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={initializeBoard} className="restart-btn">
        Reiniciar Jogo
      </button>
    </div>
  );
}
