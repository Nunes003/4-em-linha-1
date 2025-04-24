export default function FloatingPiece({ hoveredCol, currentPlayer, getPieceClass, CELL_SIZE }) {
    return (
      <div className="top-piece-row">
        <div className="floating-piece-container" style={{ left: `${hoveredCol * CELL_SIZE + 15}px` }}>
          <div className={`floating-piece ${getPieceClass(currentPlayer)}`} />
        </div>
      </div>
    );
  }
  