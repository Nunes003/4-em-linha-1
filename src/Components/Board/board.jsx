import { useEffect, useState } from "react";
import DashBoard from "./dashboard";

export default function Board() {
  const rows = 6;
  const columns = 7;

  const playRed = "R";
  const playBlue = "B";
  const [currentPlayer, setCurrentPlayer] = useState(playRed);
  const [gameover, setGameover] = useState(false);
  const [board, setBoard] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setGame();
  }, []);

  useEffect(() => {
    if (gameover && winner) {
      setTimeout(() => {
        alert(`Jogador ${winner === "R" ? "Vermelho" : "Amarelo"} venceu!`);
      }, 100);
    }
  }, [gameover, winner]);

  // função para criar o tabuleiro
  function setGame() {
    const newBoard = [];

    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < columns; c++) {
        row.push(0);
      }
      newBoard.push(row);
    }

    setBoard(newBoard);
  }

  // função para colocar a peça e verifica o posionamento da ultima peça
  function handleClick(cIndex) {
    if (gameover) return;

    const newBoard = [...board.map((row) => [...row])];

    // Começa da última linha e sobe
    for (let r = rows - 1; r >= 0; r--) {
      if (newBoard[r][cIndex] === 0) {
        newBoard[r][cIndex] = currentPlayer;

        if (checkWinner(newBoard, currentPlayer, r, cIndex)) {
          setBoard(newBoard);
          setGameover(true);
          setWinner(currentPlayer);
          return;
        }

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === playRed ? playBlue : playRed);
        return;
      }
    }
  }

  function checkWinner(board, player, row, col) {
    const directions = [
      [0, 1], // horizontal →
      [1, 0], // vertical ↓
      [1, 1], // diagonal ↘
      [1, -1], // diagonal ↙
    ];

    for (let [dr, dc] of directions) {
      let count = 1;

      // Verifica para frente
      let r = row + dr;
      let c = col + dc;
      while (
        r >= 0 &&
        r < rows &&
        c >= 0 &&
        c < columns &&
        board[r][c] === player
      ) {
        count++;
        r += dr;
        c += dc;
      }

      // Verifica para trás
      r = row - dr;
      c = col - dc;
      while (
        r >= 0 &&
        r < rows &&
        c >= 0 &&
        c < columns &&
        board[r][c] === player
      ) {
        count++;
        r -= dr;
        c -= dc;
      }

      if (count >= 4) return true;
    }

    return false;
  }

  return (
    <div className="game-board">
        <div id="board">
            {board.map((row, rIndex) => (
                <div key={rIndex} className="row">
                {row.map((cell, cIndex) => (
                    <div
                    key={cIndex}
                    className={`cell ${
                        cell === "R" ? "red" : cell === "B" ? "blue" : ""
                    }`}
                    onClick={() => handleClick(cIndex)}
                    ></div>
                ))}
                </div>
            ))}
        </div>
        
        <DashBoard currentPlayer={currentPlayer} gameover={gameover} winner={winner} onRestart={setGame}/>
    </div>
  );
}
