import { useState, useEffect, useRef } from 'react';
import BoardHeader from './boardHeader';
import FloatingPiece from './floatingPiece';
import GameCell from './gameCell';
import { checkWinner, isBoardFull } from './gameLogic';
import useTimer from './useTimer';

export default function Board({
  mode,
  player1Name,
  player2Name,
  player3Name,
  player1Piece,
  player2Piece,
  player3Piece,
}) {

  // Constantes
  const rows = 6;
  const columns = 7;
  const CELL_SIZE = 80;

  // Estados do jogo
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(player1Piece);
  const [gameover, setGameover] = useState(false);
  const [winner, setWinner] = useState(null);
  const [fallingPiece, setFallingPiece] = useState(null);

  // Jogadores e placar
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player3Score, setPlayer3Score] = useState(0);

  // Células especiais
  const [specialCells, setSpecialCells] = useState([]);
  const [revealedSpecials, setRevealedSpecials] = useState([]);

  // Temporizador
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timer, resetTimer] = useTimer(isTimerActive, () => handleTimeout());
  const [skippedPlayer, setSkippedPlayer] = useState(null);

  // Interação visual
  const [hoveredCol, setHoveredCol] = useState([]);
  const boardRef = useRef(null);

  // Efeitos colaterais
  useEffect(() => {
    initializeBoard();
    document.querySelector('.title-welcome').innerText = 'Boa sorte Jogadores!';
  }, []);

  useEffect(() => {
    if (
      mode === '1vsPC' &&
      currentPlayer === player2Piece &&
      !gameover &&
      board.some((row) => row.includes(null))
    ) {
      setIsTimerActive(false);
      const timeout = setTimeout(() => {
        playPCMove();
        setIsTimerActive(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, board, gameover]);

  // Inicialização do tabuleiro
  const initializeBoard = () => {
    const newBoard = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(null));
    setBoard(newBoard);

    let initialPlayer;
    if (mode === '1vs1') {
      initialPlayer = Math.random() < 0.5 ? player1Piece : player2Piece;
    } else if (mode === '1vsPC') {
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

  // Células especiais
  const generateSpecialCells = () => {
    const special = new Set();
    while (special.size < 5) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * columns);
      special.add(`${row}-${col}`);
    }
    return Array.from(special);
  };

  // Timeout do jogador
  const handleTimeout = () => {
    if (gameover) return;
    setIsTimerActive(false);

    let skippedName = '';
    if (mode === '1vsPC') {
      skippedName = player3Name;
    } else {
      skippedName =
        currentPlayer === player1Piece
          ? player1Name
          : currentPlayer === player2Piece
          ? player2Name
          : player3Name;
    }

    setSkippedPlayer({ name: skippedName, piece: currentPlayer });

    setTimeout(() => {
      if (mode === '1vs1') {
        setCurrentPlayer(
          currentPlayer === player1Piece ? player2Piece : player1Piece
        );
      } else if (mode === '1vsPC') {
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

      resetTimer();
      setIsTimerActive(true);
      setSkippedPlayer(null);
    }, 2000);
  };

  // Jogada do computador
  const playPCMove = () => {
    const validCols = board[0]
      .map((cell, colIndex) => (cell === null ? colIndex : null))
      .filter((col) => col !== null);

    if (validCols.length === 0) return;

    const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
    makeMove(randomCol, player2Piece);
  };

  // Clique na célula
  const handleClick = (colIndex) => {
    if (gameover) return;
    if (mode === '1vsPC' && currentPlayer !== player3Piece) return;
    makeMove(colIndex, currentPlayer);
  };

  // Realizar jogada
  const makeMove = (colIndex, piece) => {
    if (fallingPiece) return;

    const newBoard = board.map((row) => [...row]);
    let targetRow = -1;

    for (let row = rows - 1; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        targetRow = row;
        break;
      }
    }

    if (targetRow === -1) return;

    animatePieceFall(colIndex, targetRow, piece, newBoard);
  };

  // Animação da peça
  const animatePieceFall = (colIndex, targetRow, piece, newBoard) => {
    let currentRow = 0;

    const interval = setInterval(() => {
      if (currentRow > targetRow) {
        clearInterval(interval);

        newBoard[targetRow][colIndex] = piece;

        const cellKey = `${targetRow}-${colIndex}`;
        const playedSpecial = specialCells.includes(cellKey);

        if (playedSpecial && !revealedSpecials.includes(cellKey)) {
          setRevealedSpecials((prev) => [...prev, cellKey]);
          const scoreSetter = getScoreSetterByPiece(piece);
          if (scoreSetter) scoreSetter((prev) => prev + 1);
        }

        if (checkWinner(newBoard, targetRow, colIndex, piece)) {
          setGameover(true);
          setWinner(piece);
        } else if (isBoardFull(newBoard)) {
          setGameover(true);
          setWinner('draw');
        } else if (!playedSpecial) {
          if (mode === '1vs1') {
            setCurrentPlayer(
              piece === player1Piece ? player2Piece : player1Piece
            );
          } else if (mode === '1vsPC') {
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

        setBoard(newBoard);
        setFallingPiece(null);
        resetTimer();
        setIsTimerActive(true);
        return;
      }

      setFallingPiece({ col: colIndex, row: currentRow, piece });
      currentRow++;
    }, 80);
  };

  // Utilidades
  const getScoreSetterByPiece = (piece) => {
    if (mode === '1vsPC') {
      if (piece === player3Piece) return setPlayer3Score;
      if (piece === player2Piece) return setPlayer2Score;
    } else {
      if (piece === player1Piece) return setPlayer1Score;
      if (piece === player2Piece) return setPlayer2Score;
      if (piece === player3Piece) return setPlayer3Score;
    }
    return null;
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

  const getCurrentPlayerName = () => {
    if (mode === '1vsPC') {
      return currentPlayer === player3Piece ? player3Name : 'Computador';
    }
    return currentPlayer === player1Piece
      ? player1Name
      : currentPlayer === player2Piece
      ? player2Name
      : player3Name;
  };

  // Hover visual
  const handleMouseEnter = (colIndex) => setHoveredCol(colIndex);
  const handleMouseLeave = () => setHoveredCol(null);

  return (
    <div className="game-board">
      {gameover && (
        <div className="winner-message">
          {winner === 'draw'
            ? 'Empate!'
            : mode === '1vsPC'
            ? winner === player3Piece
              ? `${player3Name} venceu!`
              : 'Computador venceu!'
            : winner === player1Piece
            ? `${player1Name} venceu!`
            : winner === player2Piece
            ? `${player2Name} venceu!`
            : `${player3Name} venceu!`}
        </div>
      )}

      <div className="board-container">
        <BoardHeader
          mode={mode}
          currentPlayer={currentPlayer}
          getPieceClass={getPieceClass}
          getCurrentPlayerName={getCurrentPlayerName}
          timer={timer}
          skippedPlayer={skippedPlayer}
          player1Name={player1Name}
          player2Name={player2Name}
          player3Name={player3Name}
          player1Score={player1Score}
          player2Score={player2Score}
          player3Score={player3Score}
        />

        <FloatingPiece
          hoveredCol={hoveredCol}
          currentPlayer={currentPlayer}
          getPieceClass={getPieceClass}
          CELL_SIZE={CELL_SIZE}
        />

        <div className="board-wrapper">
          <div id="board" ref={boardRef}>
            {fallingPiece && (
              <div
                className={`animated-piece ${getPieceClass(
                  fallingPiece.piece
                )}`}
                style={{
                  position: 'absolute',
                  top: `${fallingPiece.row * CELL_SIZE}px`,
                  left: `${fallingPiece.col * CELL_SIZE + 15}px`,
                  width: '70px',
                  height: '70px',
                  transition: 'top 0.08s linear',
                  zIndex: 10,
                }}
              />
            )}

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
                    isRevealed={revealedSpecials.includes(
                      `${rowIndex}-${colIndex}`
                    )}
                    getPieceClass={getPieceClass}
                  />
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
