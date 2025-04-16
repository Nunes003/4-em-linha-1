import { useState } from 'react';
import Popup from '../Pop-Up/pop-up';
import GameModeSelector from './gameModeSelector';
import Board from '../Board/board';

export default function Welcome() {
  const [selectedMode, setSelectedMode] = useState(''); // "" | "1vs1" | "1vsPC"
  const [player1Piece, setPlayer1Piece] = useState('R');
  const [player2Piece, setPlayer2Piece] = useState('Y');
  const [player3Piece, setPlayer3Piece] = useState('R');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player3Name, setPlayer3Name] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // para apresentar o tabuleiro

  const validatePlayers = () => {
    console.log('Modo de Jogo Selecionado:', selectedMode);

    if (selectedMode === '1vs1') {
      if (!player1Name || !player2Name) {
        setPopupMessage('Preencha o nome dos jogadores.');
        setShowPopup(true);
        return false;
      }

      if (
        player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()
      ) {
        setPopupMessage('Os nomes dos jogadores não podem ser iguais.');
        setShowPopup(true);
        return false;
      }

      if (player1Piece === player2Piece) {
        setPopupMessage('Cada jogador deve escolher uma peça diferente.');
        setShowPopup(true);
        return false;
      }
    }

    if (selectedMode === '1vsPC') {
      if (!player3Name) {
        setPopupMessage('Preencha o nome do jogador.');
        setShowPopup(true);
        return false;
      }
    }

    setGameStarted(true);
    document.querySelector('.return-btn').style.display = 'block';
    return true;
  };

  const instructionsContent = (
    <div className="instructions-container">
      <span className="instructions-title">Como jogar?</span>
      <div className="instructions-content">
        <span className="instructions-text">🔴 Cada jogador joga alternadamente.</span>
        <span className="instructions-text">🟡 O objetivo é alinhar 4 peças na horizontal, vertical ou diagonal.</span>
        <span className="instructions-text">🎯 Clique na coluna para soltar a peça. O primeiro a alinhar 4 vence!</span>
      </div>
    </div>
  );
  

  return (
    <div className="welcome-container">
      <span className="title-welcome">Bem-vindo Jogador!</span>

      {!gameStarted ? (
        <GameModeSelector
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          player1Piece={player1Piece}
          setPlayer1Piece={setPlayer1Piece}
          player2Piece={player2Piece}
          setPlayer2Piece={setPlayer2Piece}
          player3Piece={player3Piece}
          setPlayer3Piece={setPlayer3Piece}
          player1Name={player1Name}
          setPlayer1Name={setPlayer1Name}
          player2Name={player2Name}
          setPlayer2Name={setPlayer2Name}
          player3Name={player3Name}
          setPlayer3Name={setPlayer3Name}
          validatePlayers={validatePlayers}
        />
      ) : (
        <Board
          mode={selectedMode}
          player1Name={player1Name}
          player2Name={player2Name}
          player3Name={player3Name}
          player1Piece={player1Piece}
          player2Piece={player2Piece}
          player3Piece={player3Piece}
        />
      )}

      <button
        className="how-to-play-btn"
        onClick={() => setShowInstructions(!showInstructions)}
      >
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

      {showInstructions && (
        <Popup message={instructionsContent} onClose={() => setShowInstructions(false)} />
      )}

      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
