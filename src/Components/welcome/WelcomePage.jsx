import React, { useState } from 'react';
import Popup from '../Pop-Up/Pop-up';

export default function WelcomePage() {
  const [showInstructions, setShowInstructions] = useState(false);

  const instructionsContent = (
    <div className="instructions-container">
      <span className="instructions-title">Como jogar?</span>
      <div className="instructions-content">
        <div className="instruction-row">
          <span className="instructions-text">🔴</span>
          <span>Cada jogador joga alternadamente.</span>
        </div>
        <div className="instruction-row">
          <span className="instructions-text">🟡</span>
          <span>
            O objetivo é alinhar 4 peças na horizontal, vertical ou diagonal.
          </span>
        </div>
        <div className="instruction-row">
          <span className="instructions-text">🎯</span>
          <span>
            Clique na coluna para soltar a peça. O primeiro a alinhar 4 vence!
          </span>
        </div>
        <div className="instruction-row">
          <span className="instructions-text">🟢</span>
          <span>O jogador que não jogar na sua vez, perde a vez.</span>
        </div>
        <div className="instruction-row">
          <span className="instructions-text">🟣</span>
          <span>
            Caso o jogador ganhe a jogada bónus, o mesmo pode jogar novamente.
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="welcome-container">
      <span className="title-welcome">Bem-vindo Jogador!</span>

      <p className="welcome-description">
        O clássico jogo de estratégia! Conecte 4 peças da sua cor antes do seu
        adversário.
      </p>
      <div style={{ display: 'flex', gap:"20px" ,alignItems: 'center' }}>
      <a href="/game-menu" className="button">
        <button>Jogar</button>
      </a>
      
        <button
          className="how-to-play-btn"
          onClick={() => setShowInstructions(!showInstructions)}>
          {showInstructions ? (
            'Esconder Instruções'
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
      </div>
      {showInstructions && (
        <Popup
          message={instructionsContent}
          onClose={() => setShowInstructions(false)}
        />
      )}
    </div>
  );
}
