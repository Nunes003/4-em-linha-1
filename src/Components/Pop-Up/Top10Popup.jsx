import React, { useEffect, useState } from 'react';
import '../../Styles/PopUp/Top10Popup.css';

export default function Top10Popup({ onClose }) {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('matchHistory')) || [];
    const winCount = {};

    history.forEach((match) => {
      const isAgainstComputer = match.mode === '1vsPC';
      const isValidWinner = match.winner && match.winner !== 'Empate';

      if (isValidWinner) {
        winCount[match.winner] = (winCount[match.winner] || 0) + 1;
      }
    });

    // Ordena os jogadores por número de vitórias e pega os 10 melhores
    const sortedTop = Object.entries(winCount)
      .map(([name, wins]) => ({ name, wins }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 10);

    setTopPlayers(sortedTop);
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-box top10-popup">
        <h2>🏆 Top 10 Jogadores</h2>
        {topPlayers.length === 0 ? (
          <p>Nenhuma vitória registrada ainda.</p>
        ) : (
          <ol className="top10-list">
            {topPlayers.map((player, index) => (
              <li key={index}>
                <strong>{player.name}</strong> — {player.wins} vitória(s)
              </li>
            ))}
          </ol>
        )}

        <div className="popup-buttons">
          <button className="popup-close-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
