import React from "react";

export default function DashBoard({ currentPlayer, gameover, winner, onRestart }) {
  return (
    <header className="game-info">
      {!gameover ? (
        <p>
          Jogador Atual:{" "}
          <span className={currentPlayer === "R" ? "red" : "blue"}>
            {currentPlayer === "R" ? "Vermelho" : "Amarelo"}
          </span>
        </p>
      ) : (
        <p>
          🏆{" "}
          <span className={winner === "R" ? "red" : "blue"}>
            {winner === "R" ? "Vermelho" : "Amarelo"}
          </span>{" "}
          venceu!
        </p>
      )}

      <button onClick={onRestart}>Reiniciar</button>
    </header>
  );
}
