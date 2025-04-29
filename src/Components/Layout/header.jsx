import React, { useState } from 'react';
import Popup from '../Pop-Up/pop-up';

export default function Header() {
  const [showPopup, setShowPopup] = useState(false);

  function handleTop10Click() {
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
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

      <button className="top10-btn" onClick={handleTop10Click}>
          Top 10 Jogadores
        </button>

      {showPopup && (
        <Popup
          message="Aqui estão os 10 melhores jogadores!"
          onClose={closePopup}
        />
      )}
    </header>
  );
}
