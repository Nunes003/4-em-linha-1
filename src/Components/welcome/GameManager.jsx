import { useEffect, useState } from 'react';
import Popup from '../Pop-Up/Pop-up';
import GameModeSelector from './GameModeSelector';
import Board from '../Board/Board';

export default function GameManager(){
  // Estados relacionados a configuração do jogo
  const [selectedMode, setSelectedMode] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player3Name, setPlayer3Name] = useState('');
  const [player1Piece, setPlayer1Piece] = useState('R');
  const [player2Piece, setPlayer2Piece] = useState('Y');
  const [player3Piece, setPlayer3Piece] = useState('R');

  // Estados relacionados a UI
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
 
    console.log('Modo de Jogo Selecionado:', selectedMode);
    console.log('Nome do Jogador 1:', player1Name);
    console.log('Peça do Jogador 1:', player1Piece);
    console.log('Nome do Jogador 2:', player2Name);
    console.log('Peça do Jogador 2:', player2Piece);
    console.log('Nome do Jogador 3:', player3Name);
    console.log('Peça do Jogador 3:', player3Piece);
    console.log('--------------------------------------');

  }, [selectedMode, player1Name, player2Name, player3Name, player1Piece, player2Piece, player3Piece]);

  // Validação dos dados antes de iniciar o jogo
  const validatePlayers = () => {  
    if (selectedMode === '1vs1') {
      if (!player1Name || !player2Name) {
        setPopupMessage('Preencha o nome dos jogadores.');
        setShowPopup(true);
        return false;
      }

      if (player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()) {
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
    document.querySelector('.top10-btn').style.display = 'none';
    return true;
  };


  return (
    <div className="GameMenu-container">

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

      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
