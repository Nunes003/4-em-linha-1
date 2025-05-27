import React, { useEffect, useState } from 'react';
import '../../Styles/PopUp/MatchHistoryPopup.css';

export default function MatchHistoryPopup({ onClose }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('matchHistory')) || [];
    setMatches(stored.reverse());

    console.log('Histórico de partidas carregado:', stored);
  }, []);

  const getPieceColorClass = (piece) => {
    switch (piece) {
      case 'R':
        return 'piece-circle red';
      case 'Y':
        return 'piece-circle yellow';
      case 'G':
        return 'piece-circle green';
      case 'P':
        return 'piece-circle purple';
      case 'RGB':
        return 'piece-circle rainbow';
      default:
        return 'piece-circle';
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('matchHistory');
    setMatches([]);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box match-history">
        <div className="popup-header">
          <h2>Histórico de Partidas</h2>
          <button className="popup-clear-btn" onClick={clearHistory}>
            <img src="trash.svg" className="trash" alt="trash" />
          </button>
        </div>

        {matches.length === 0 ? (
          <p>Nenhuma partida registrada.</p>
        ) : (
          <ul className="match-list">
            {matches.map((match, index) => (
              <li key={index} className="match-card">
                <div className="match-content">
                  <div className="match-section">
                    <p>
                      <strong>Modo:</strong> {match.mode}
                    </p>
                  </div>

                  <div className="match-section">
                    <strong>Jogadores:</strong>
                    <ul className="player-list">
                      {match.players.map((player, i) => (
                        <li key={i} className="player-line">
                          <span
                            className={`piece-icon ${getPieceColorClass(
                              player.piece
                            )}`}></span>
                          <span>
                            {player.name} — {player.score} ponto(s)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="match-section">
                    <p>
                      <strong>Vencedor:</strong> {match.winner}
                    </p>
                    {match.reason && (
                      <p className="match-reason">
                        <em>
                          <strong>Tipo de vitória: </strong>
                          {match.reason}
                        </em>
                      </p>
                    )}
                  </div>

                  <div className="match-date">
                    <p>
                      <strong>Data:</strong> {match.date}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="popup-buttons">
          <button className="popup-close-btn" onClick={onClose}>
            Fechar
          </button>
          {/* <button className="popup-clear-btn" onClick={clearHistory}><img src="trash.svg" className="trash" alt="trash" /></button> */}
        </div>
      </div>
    </div>
  );
}
