import React from "react";

export default function BoardHeader({ currentPlayer, getPieceClass, getCurrentPlayerName, timer, skippedPlayer }) {
  return (
    <div className="player-info">
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
