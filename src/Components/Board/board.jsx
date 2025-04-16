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

  document.querySelector('.title-welcome').innerText = 'Boa sorte Jogadores!';

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

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (mode === '1vsPC' && currentPlayer === player2Piece && !gameover) {
      // Jogada do PC após um pequeno atraso
      const timeout = setTimeout(() => {
        playPCMove();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, board]);

  const initializeBoard = () => {
    const newBoard = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));
    setBoard(newBoard);
    setCurrentPlayer(mode === '1vsPC' ? player3Piece : player1Piece);
    setGameover(false);
    setWinner(null);
  };

  const handleClick = (colIndex) => {
    if (gameover) return;

    if (mode === '1vsPC' && currentPlayer !== player3Piece) return; // Só o player joga com clique

    makeMove(colIndex, currentPlayer);
  };

  const playPCMove = () => {
    const validCols = [];
    for (let col = 0; col < columns; col++) {
      if (board[0][col] === null) {
        validCols.push(col);
      }
    }

    if (validCols.length === 0) return;

    const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
    makeMove(randomCol, player2Piece);
  };

  const makeMove = (colIndex, piece) => {
    const newBoard = [...board.map((row) => [...row])];
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = piece;

        if (checkWinner(newBoard, row, colIndex, piece)) {
          setGameover(true);
          setWinner(piece);
        } else if (isBoardFull(newBoard)) {
          setGameover(true);
          setWinner('draw');
        } else {
          if (mode === '1vs1') {
            setCurrentPlayer(
              piece === player1Piece ? player2Piece : player1Piece
            );
          } else if (mode === '1vsPC') {
            setCurrentPlayer(
              piece === player3Piece ? player2Piece : player3Piece
            );
          } else {
            // 3 jogadores
            setCurrentPlayer(
              piece === player1Piece
                ? player3Piece
                : piece === player3Piece
                ? player1Piece
                : player1Piece
            );
          }
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
      { row: 1, col: 1 }, // Diagonal ↘
      { row: 1, col: -1 }, // Diagonal ↙
    ];

    for (const { row: dRow, col: dCol } of directions) {
      let count = 1;
      count += countInDirection(board, row, col, dRow, dCol, piece);
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

  const isBoardFull = (board) => {
    return board[0].every((cell) => cell !== null);
  };

 

  return (
    <div className="game-board">
      {gameover && (
        <div className="winner-message">
          {winner === 'draw'
            ? 'Empate!'
            : winner === player1Piece
            ? `${player1Name} venceu!`
            : winner === player2Piece
            ? `${
                mode === '1vsPC'
                  ? 'Computador venceu!'
                  : player2Name + ' venceu!'
              }`
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
