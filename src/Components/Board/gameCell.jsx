export default function GameCell({
    rowIndex,
    colIndex,
    cell,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isSpecial,
    isRevealed,
    getPieceClass,
  }) {
    return (
      <div
        className={`cell ${getPieceClass(cell)} ${isSpecial && isRevealed ? "special-cell" : ""}`}
        onClick={() => onClick(colIndex)}
        onMouseEnter={() => onMouseEnter(colIndex)}
        onMouseLeave={onMouseLeave}
      />
    );
  }
  