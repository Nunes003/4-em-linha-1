import React, { useEffect, useState } from 'react';
import '../../Styles/PopUp/MatchHistoryPopup.css';

export default function MatchHistoryPopup({ onClose }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('matchHistory')) || [];
    setMatches(stored.reverse());
  }, []);

  const getPieceColorClass = (piece) => {
    switch (piece) {
      case 'R': return 'piece-circle red';
      case 'Y': return 'piece-circle yellow';
      case 'G': return 'piece-circle green';
      case 'P': return 'piece-circle purple';
      case 'RGB': return 'piece-circle rainbow';
      default: return 'piece-circle';
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('matchHistory');
    setMatches([]);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box match-history">
        <h2>Histórico de Partidas</h2>

        {matches.length === 0 ? (
          <p>Nenhuma partida registrada.</p>
        ) : (
          <ul className="match-list">
            {matches.map((match, index) => (
              <li key={index} className="match-entry">
                <div><strong>Data:</strong> {match.date}</div>
                <div><strong>Modo:</strong> {match.mode}</div>

                <div><strong>Jogadores:</strong></div>
                <ul className="player-list">
                  {match.players.map((player, i) => (
                    <li key={i} className="player-line">
                      <span className={getPieceColorClass(player.piece)}></span>
                      <span>{player.name} — {player.score} ponto(s)</span>
                    </li>
                  ))}
                </ul>

                <div><strong>Vencedor:</strong> {match.winner}</div>
                {match.reason && (
                  <div className="match-reason">
                    <em>{match.reason}</em>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="popup-buttons">
          <button className="popup-close-btn" onClick={onClose}>Fechar</button>
          {/* <button className="popup-clear-btn" onClick={clearHistory}>Limpar Histórico</button> */}
        </div>
      </div>
    </div>
  );
}
