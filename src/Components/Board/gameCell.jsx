export default function GameCell({
    rowIndex,
    colIndex,
    cell,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isSpecial,
    isHoveredCol,
    isRevealedSpecial,
    getPieceClass,
  }) {
    return (
      // deixar esconsido as celulas especiais
      //{isRevealedSpecial ? " special-cell" : ""}
      <div
        className={`cell ${getPieceClass(cell)}${
          isSpecial ? " special-cell" : ""
        }${isHoveredCol ? " hovered-col" : ""}`}
        onClick={() => onClick(colIndex)}
        onMouseEnter={() => onMouseEnter(colIndex)}
        onMouseLeave={onMouseLeave}
      />
    );
  }
