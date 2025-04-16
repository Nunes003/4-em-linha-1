import { useState } from "react";
import PieceSelector from "./PieceSelector";

export default function Welcome() {
  const [selectedMode, setSelectedMode] = useState(""); // "" | "1vs1" | "1vsPC"
  const [player1Piece, setPlayer1Piece] = useState("R");
  const [player2Piece, setPlayer2Piece] = useState("B");
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="welcome-container">
      <h1>Bem-vindo Jogador!</h1>
      <p className="welcome-description">
        O clássico jogo de estratégia! Conecte 4 peças da sua cor antes do seu
        adversário.
      </p>

      <div className="button-group">
        <button
          className={`game-mode-btn ${selectedMode === "1vs1" ? "active" : ""}`}
          onClick={() =>
            setSelectedMode((prev) => (prev === "1vs1" ? "" : "1vs1"))
          }
        >
          🤼‍♂️ 1 vs 1
        </button>

        <button
          className={`game-mode-btn ${
            selectedMode === "1vsPC" ? "active" : ""
          }`}
          onClick={() =>
            setSelectedMode((prev) => (prev === "1vsPC" ? "" : "1vsPC"))
          }
        >
          🧠 1 vs PC
        </button>
      </div>

      {selectedMode === "1vs1" && (
        <div className="select-game-box">
          <div className="player-setup">
            <label className="piece-selector">Escolha as peças:</label>
            <PieceSelector
              
              value={player1Piece}
              onChange={setPlayer1Piece}
            />

            {/* <input type="text" placeholder="Nome do Jogador 2" />
            <PieceSelector
              label="Peça do Jogador 2"
              value={player2Piece}
              onChange={setPlayer2Piece}
            /> */}
          </div>
        </div>
      )}

      {selectedMode === "1vsPC" && (
        <div className="select-game-box">
          <div className="player-setup">
            <input type="text" placeholder="Nome do Jogador" />
            <PieceSelector
              label="Peça do Jogador"
              value={player1Piece}
              onChange={setPlayer1Piece}
            />
          </div>
        </div>
      )}

      <button
        className="how-to-play-btn"
        onClick={() => setShowInstructions(!showInstructions)}
      >
        {showInstructions ? (
          "Esconder Instruções"
        ) : (
          <div className="how-to-play-content">
            <img
              className="how-to-play-icon"
              src="./settings.svg"
              alt="Instruções"
            />
            <span>Como jogar?</span>
          </div>
        )}
      </button>

      {showInstructions && (
        <div className="instructions-box">
          <p>
            🔴 Cada jogador joga alternadamente. <br />
            🟡 O objetivo é alinhar 4 peças na horizontal, vertical ou diagonal.{" "}
            <br />
            🎯 Clique na coluna para soltar a peça. O primeiro a alinhar 4
            vence!
          </p>
        </div>
      )}
    </div>
  );
}
