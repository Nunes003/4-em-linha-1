import React, { useState } from 'react';
import Top10Popup from '../Pop-Up/Top10Popup';
import MatchHistoryPopup from '../Pop-Up/MatchHistoryPopup';

export default function Header() {
  const [showTop10Popup, setShowTop10Popup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);

  function handleTop10Click() {
    setShowTop10Popup(true);
  }

  function handleHistoryClick() {
    setShowHistoryPopup(true);
  }

  function closeTop10Popup() {
    setShowTop10Popup(false);
  }

  function closeHistoryPopup() {
    setShowHistoryPopup(false);
  }

  function backToMenu() {
    window.location.href = 'http://localhost:3000/';
  }

  return (
    <header className="game-header">
      <h1>🟡 4 em Linha</h1>

      <button onClick={backToMenu} className="return-btn">
        Voltar ao Menu
      </button>

      <button className="history-btn" onClick={handleHistoryClick}>
        <img src="history.svg" alt="History Icon" className="history-icon" />
        Histórico de Partidas
      </button>
      
      <button className="top10-btn" onClick={handleTop10Click}>
        <img src="prize.svg" alt="Top 10 Icon" className="top10-icon" />
        Top 10 Jogadores
      </button>

      {showTop10Popup && <Top10Popup onClose={closeTop10Popup} />}

      {showHistoryPopup && <MatchHistoryPopup onClose={closeHistoryPopup} />}
    </header>
  );
}
