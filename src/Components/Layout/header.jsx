import React from 'react';

export default function Header() {
  function backToMenu() {
    window.location.href = 'http://localhost:3000/';
  }

  return (
    <header className="game-header">

      <h1>🎮 4 em Linha</h1>
      <button onClick={backToMenu} className="return-btn">
        Escolher outro modo de Jogo
      </button>

      
    </header>
  );
}
