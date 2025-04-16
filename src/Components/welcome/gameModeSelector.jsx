import PieceSelector from './PieceSelector';

export default function GameModeSelector({
  selectedMode,
  setSelectedMode,
  player1Piece,
  setPlayer1Piece,
  player2Piece,
  setPlayer2Piece,
  player3Piece,
  setPlayer3Piece,
  player1Name,
  setPlayer1Name,
  player2Name,
  setPlayer2Name,
  player3Name,
  setPlayer3Name,
  validatePlayers,
}) {
  return (
    <>
      <p className="welcome-description">
        O clássico jogo de estratégia! Conecte 4 peças da sua cor antes do seu
        adversário.
      </p>

      <div className="button-group">
        <button
          className={`game-mode-btn ${selectedMode === '1vs1' ? 'active' : ''}`}
          onClick={() =>
            setSelectedMode(selectedMode !== '1vs1' ? '1vs1' : '')
          }>
          🤼‍♂️ 1 vs 1
        </button>

        <button
          className={`game-mode-btn ${selectedMode === '1vsPC' ? 'active' : ''}`}
          onClick={() =>
            setSelectedMode(selectedMode !== '1vsPC' ? '1vsPC' : '')
          }>
          🧠 1 vs PC
        </button>
      </div>

      {selectedMode === '1vs1' && (
        <div className="select-game-box">
          <div className="player-setup">
            <label className="piece-selector">Escolha as peças:</label>
            <div className="piece-selector-box">
              <PieceSelector
                label="Jogador 1"
                value={player1Piece}
                onChange={setPlayer1Piece}
                name={player1Name}
                onNameChange={setPlayer1Name}
              />

              <PieceSelector
                label="Jogador 2"
                value={player2Piece}
                onChange={setPlayer2Piece}
                name={player2Name}
                onNameChange={setPlayer2Name}
              />
            </div>
          </div>
          <button className="start-game-btn" onClick={validatePlayers}>
            Iniciar Jogo
          </button>
        </div>
      )}

      {selectedMode === '1vsPC' && (
        <div className="select-game-box">
          <div className="player-setup">
            <PieceSelector
              label="Jogador"
              value={player3Piece}
              onChange={setPlayer3Piece}
              name={player3Name}
              onNameChange={setPlayer3Name}
            />
          </div>
          <button className="start-game-btn" onClick={validatePlayers}>
            Iniciar Jogo
          </button>
        </div>
      )}
    </>
  );
}
