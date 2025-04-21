import { useState, useEffect, useRef } from "react";

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

  const [timer, setTimer] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [skippedPlayer, setSkippedPlayer] = useState(null);

  const [specialCells, setSpecialCells] = useState([]);
  const [revealedSpecials, setRevealedSpecials] = useState([]);
  const [hoveredCol, setHoveredCol] = useState(3);
  const boardRef = useRef(null);
  const CELL_SIZE = 80;


  console.log(hoveredCol);

  document.querySelector(".title-welcome").innerText = "Boa sorte Jogadores!";

  const getPieceClass = (cell) => {
    switch (cell) {
      case "R":
        return "red-piece";
      case "Y":
        return "yellow-piece";
      case "G":
        return "green-piece";
      case "P":
        return "purple-piece";
      case "RGB":
        return "rainbow-piece";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (gameover || !isTimerActive) return;

    if (timer === 0) {
      setIsTimerActive(false);

      let skippedName = "";
      if (mode === "1vsPC") {
        skippedName = player3Name;
      } else {
        if (currentPlayer === player1Piece) skippedName = player1Name;
        else if (currentPlayer === player2Piece) skippedName = player2Name;
        else if (currentPlayer === player3Piece) skippedName = player3Name;
      }

      setSkippedPlayer({ name: skippedName, piece: currentPlayer });

      setTimeout(() => {
        if (mode === "1vs1") {
          setCurrentPlayer(
            currentPlayer === player1Piece ? player2Piece : player1Piece
          );
        } else if (mode === "1vsPC") {
          setCurrentPlayer(
            currentPlayer === player3Piece ? player2Piece : player3Piece
          );
        } else {
          setCurrentPlayer(
            currentPlayer === player1Piece
              ? player3Piece
              : currentPlayer === player3Piece
              ? player2Piece
              : player1Piece
          );
        }

        setTimer(10);
        setIsTimerActive(true);
        setSkippedPlayer(null);
      }, 2000);

      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, isTimerActive, currentPlayer, gameover]);

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    if (mode === "1vsPC" && currentPlayer === player2Piece && !gameover) {
      setIsTimerActive(false);

      const timeout = setTimeout(() => {
        playPCMove();
        setIsTimerActive(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, board, gameover]);

  const generateSpecialCells = () => {
    const special = new Set();

    while (special.size < 5) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * columns);
      special.add(`${row}-${col}`);
    }

    return Array.from(special);
  };

  const initializeBoard = () => {
    const newBoard = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));
    setBoard(newBoard);

    let initialPlayer;
    if (mode === "1vs1") {
      initialPlayer = Math.random() < 0.5 ? player1Piece : player2Piece;
    } else if (mode === "1vsPC") {
      initialPlayer = Math.random() < 0.5 ? player3Piece : player2Piece; // humano ou PC
    } else {
      const options = [player1Piece, player2Piece, player3Piece];
      initialPlayer = options[Math.floor(Math.random() * options.length)];
    }
    setCurrentPlayer(initialPlayer);

    const specials = generateSpecialCells();
    setSpecialCells(specials);

    setGameover(false);
    setWinner(null);
    setTimer(10);
    setIsTimerActive(true);
    setSkippedPlayer(null);
  };

  const handleClick = (colIndex) => {
    if (gameover) return;

    if (mode === "1vsPC" && currentPlayer !== player3Piece) return;

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

        const cellKey = `${row}-${colIndex}`;
        const playedSpecial = specialCells.includes(cellKey);

        if (playedSpecial && !revealedSpecials.includes(cellKey)) {
          setRevealedSpecials((prev) => [...prev, cellKey]);
        }

        if (checkWinner(newBoard, row, colIndex, piece)) {
          setGameover(true);
          setWinner(piece);
        } else if (isBoardFull(newBoard)) {
          setGameover(true);
          setWinner("draw");
        } else {
          if (!playedSpecial) {
            if (mode === "1vs1") {
              setCurrentPlayer(
                piece === player1Piece ? player2Piece : player1Piece
              );
            } else if (mode === "1vsPC") {
              setCurrentPlayer(
                piece === player3Piece ? player2Piece : player3Piece
              );
            } else {
              setCurrentPlayer(
                piece === player1Piece
                  ? player3Piece
                  : piece === player3Piece
                  ? player2Piece
                  : player1Piece
              );
            }
          }
        }

        setTimer(10);
        setIsTimerActive(true);
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

  const getCurrentPlayerName = () => {
    if (mode === "1vsPC") {
      if (currentPlayer === player3Piece) return player3Name; // humano
      if (currentPlayer === player2Piece) return "Computador"; // PC
    } else {
      if (currentPlayer === player1Piece) return player1Name;
      if (currentPlayer === player2Piece) return player2Name;
      if (currentPlayer === player3Piece) return player3Name;
    }
    return "";
  };

  const isBoardFull = (board) => {
    return board[0].every((cell) => cell !== null);
  };

  const handleMouseEnter = (colIndex) => {
    setHoveredCol(colIndex);
  };

  const handleMouseLeave = () => {
    setHoveredCol(null);
  };

  return (
    <div className="game-board">
      {gameover && (
        <div className="winner-message">
          {winner === "draw"
            ? "Empate!"
            : mode === "1vsPC"
            ? winner === player3Piece
              ? `${player3Name} venceu!`
              : "Computador venceu!"
            : winner === player1Piece
            ? `${player1Name} venceu!`
            : winner === player2Piece
            ? `${player2Name} venceu!`
            : `${player3Name} venceu!`}
        </div>
      )}

      <div className="board-container">
        <div className="player-info">
          <div className="player-status-line">
            <div className={`current-player ${getPieceClass(currentPlayer)}`}>
              <span>
                É a vez de: <strong>{getCurrentPlayerName()}</strong>
              </span>
            </div>

            {skippedPlayer && (
              <div
                className={`skipped-inline ${getPieceClass(
                  skippedPlayer.piece
                )}`}
              >
                {skippedPlayer.name} perdeu o turno!
              </div>
            )}

            <div className={`timer ${timer <= 4 ? "timer-warning" : ""}`}>
              <img className="img-timer" src="./timer.png" alt="timer" />
              {timer} s
            </div>
          </div>
        </div>

        <div className="top-piece-row">
          <div className="top-piece-row">
            <div
              className="floating-piece-container"
              style={{ left: `${hoveredCol * CELL_SIZE + 15}px` }} // +15px = padding do tabuleiro
            >
              <div
                className={`floating-piece ${getPieceClass(currentPlayer)}`}
              />
            </div>
          </div>
        </div>

        <div className="board-wrapper">
          <div id="board" ref={boardRef}>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`cell ${getPieceClass(cell)} ${
                      specialCells.includes(`${rowIndex}-${colIndex}`) &&
                      revealedSpecials.includes(`${rowIndex}-${colIndex}`)
                        ? "special-cell"
                        : ""
                    }`}
                    onClick={() => handleClick(colIndex)}
                    onMouseEnter={() => handleMouseEnter(colIndex)}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={initializeBoard} className="restart-btn">
        Reiniciar Jogo
      </button>
    </div>
  );
}
