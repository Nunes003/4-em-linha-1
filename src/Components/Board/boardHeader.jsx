import React from "react";

export default function BoardHeader({ mode,currentPlayer, getPieceClass, getCurrentPlayerName, timer, skippedPlayer , player1Score , player2Score , player3Score, player1Name, player2Name, player3Name }) {
  // console.log(currentPlayer);
  // console.log(mode);
  
  return (
    <div className="player-info">
      <div className="scores">
        {mode === "1vs1" ? (
          <div className="player-scores">
            <span>{player1Name}: {player1Score} pontos</span>
            <span>{player2Name}: {player2Score} pontos</span>
          </div>
        ) : (
          <div className="player-scores">
          
            <span>Computador : {player2Score} pontos</span>
            <span>{player3Name} : {player3Score} pontos</span>
          </div>
        )}
      </div>
      <div className="player-status-line">
        <div className={`current-player ${getPieceClass(currentPlayer)}`}>
          <span>
            É a vez de: <strong>{getCurrentPlayerName()}</strong>
          </span>
        </div>

        {skippedPlayer && (
          <div className={`skipped-inline ${getPieceClass(skippedPlayer.piece)}`}>
            {skippedPlayer.name} perdeu o turno!
          </div>
        )}

        <div className={`timer ${timer <= 4 ? "timer-warning" : ""}`}>
          <img className="img-timer" src="./timer.png" alt="timer" />
          {timer} s
        </div>
      </div>
    </div>
  );
}
