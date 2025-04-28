import { useState, useEffect, useRef } from "react";
import BoardHeader from "./boardHeader";
import FloatingPiece from "./floatingPiece";
import GameCell from "./gameCell";
import { checkWinner, isBoardFull } from "./gameLogic";
import useTimer from "./useTimer";

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
  const CELL_SIZE = 80;

  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1Piece);
  const [gameover, setGameover] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [skippedPlayer, setSkippedPlayer] = useState(null);
  const [specialCells, setSpecialCells] = useState([]);
  const [revealedSpecials, setRevealedSpecials] = useState([]);
  const [hoveredCol, setHoveredCol] = useState(0);
  const boardRef = useRef(null);

  // Sistema de pontuação

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3Score, setPlayer3Score] = useState(0);

  const [timer, resetTimer] = useTimer(isTimerActive, () => handleTimeout());

  useEffect(() => {
    initializeBoard();
    document.querySelector(".title-welcome").innerText = "Boa sorte Jogadores!";
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
      initialPlayer = Math.random() < 0.5 ? player3Piece : player2Piece;
    } else {
      const options = [player1Piece, player2Piece, player3Piece];
      initialPlayer = options[Math.floor(Math.random() * options.length)];
    }
    setCurrentPlayer(initialPlayer);

    setSpecialCells(generateSpecialCells());
    setRevealedSpecials([]);
    setGameover(false);
    setWinner(null);
    resetTimer();
    setIsTimerActive(true);
    setSkippedPlayer(null);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer3Score(0);
  };

  const handleTimeout = () => {
    if (gameover) return;
    setIsTimerActive(false);

    let skippedName = "";
    if (mode === "1vsPC") {
      skippedName = player3Name;
    } else {
      if (currentPlayer === player1Piece) skippedName = player1Name;
      else if (currentPlayer === player2Piece) skippedName = player2Name;
      else skippedName = player3Name;
    }

    setSkippedPlayer({ name: skippedName, piece: currentPlayer });

    setTimeout(() => {
      if (mode === "1vs1") {
        setCurrentPlayer(currentPlayer === player1Piece ? player2Piece : player1Piece);
      } else if (mode === "1vsPC") {
        setCurrentPlayer(currentPlayer === player3Piece ? player2Piece : player3Piece);
      } else {
        setCurrentPlayer(
          currentPlayer === player1Piece
            ? player3Piece
            : currentPlayer === player3Piece
            ? player2Piece
            : player1Piece
        );
      }
      resetTimer();
      setIsTimerActive(true);
      setSkippedPlayer(null);
    }, 2000);
  };

  const handleClick = (colIndex) => {
    if (gameover) return;
    if (mode === "1vsPC" && currentPlayer !== player3Piece) return;
    makeMove(colIndex, currentPlayer);
  };

  const playPCMove = () => {
    const validCols = board[0]
      .map((cell, colIndex) => (cell === null ? colIndex : null))
      .filter((col) => col !== null);

    if (validCols.length === 0) return;
    const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
    makeMove(randomCol, player2Piece);
  };

  const makeMove = (colIndex, piece) => {
    const newBoard = board.map((row) => [...row]);
    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = piece;

        const cellKey = `${row}-${colIndex}`;
        const playedSpecial = specialCells.includes(cellKey);

        if (playedSpecial && !revealedSpecials.includes(cellKey)) {
          setRevealedSpecials((prev) => [...prev, cellKey]);

          if (piece === player1Piece) setPlayer1Score((prev) => prev + 1);
          else if (piece === player2Piece) setPlayer2Score((prev) => prev + 1);
          else if (piece === player3Piece) setPlayer3Score((prev) => prev + 1);
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
              setCurrentPlayer(piece === player1Piece ? player2Piece : player1Piece);
            } else if (mode === "1vsPC") {
              setCurrentPlayer(piece === player3Piece ? player2Piece : player3Piece);
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

        resetTimer();
        setIsTimerActive(true);
        setBoard(newBoard);
        return;
      }
    }
  };

  const getPieceClass = (cell) => {
    switch (cell) {
      case "R": return "red-piece";
      case "Y": return "yellow-piece";
      case "G": return "green-piece";
      case "P": return "purple-piece";
      case "RGB": return "rainbow-piece";
      default: return "";
    }
  };

  
  const getCurrentPlayerName = () => {
    if (mode === "1vsPC") {
      if (currentPlayer === player3Piece) return player3Name;
      if (currentPlayer === player2Piece) return "Computador";
    } else {
      if (currentPlayer === player1Piece) return player1Name;
      if (currentPlayer === player2Piece) return player2Name;
      if (currentPlayer === player3Piece) return player3Name;
    }
    return "";
  };


  const handleMouseEnter = (colIndex) => setHoveredCol(colIndex);
  const handleMouseLeave = () => setHoveredCol(null);

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

        {/* Cabeçalho do tabuleiro com informações do jogador atual e temporizador */}
        <BoardHeader
          mode={mode}
          currentPlayer={currentPlayer}
          getPieceClass={getPieceClass}
          getCurrentPlayerName={getCurrentPlayerName}
          timer={timer}
          player1Name = {player1Name}
          player2Name = {player2Name}
          player3Name = {player3Name}
          
          skippedPlayer={skippedPlayer}
          player1Score={player1Score}
          player2Score={player2Score}
          player3Score={player3Score}
        />

        {/* Peça que desliza sobre o tabuleiro */}
        <FloatingPiece
          hoveredCol={hoveredCol}
          currentPlayer={currentPlayer}
          getPieceClass={getPieceClass}
          CELL_SIZE={CELL_SIZE}
        />

        {/* Tabuleiro */}
        <div className="board-wrapper">
          <div id="board" ref={boardRef}>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <GameCell
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    cell={cell}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    isSpecial={specialCells.includes(`${rowIndex}-${colIndex}`)}
                    isRevealed={revealedSpecials.includes(`${rowIndex}-${colIndex}`)}
                    getPieceClass={getPieceClass}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={initializeBoard} className="restart-btn">Reiniciar Jogo</button>
    </div>
  );
}
