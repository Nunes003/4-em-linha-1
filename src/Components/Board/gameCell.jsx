export default function GameCell({
    rowIndex,
    colIndex,
    cell,
    onClick,
    onMouseEnter,
    onMouseLeave,
    isSpecial,
    isHoveredCol,
    getPieceClass,
  }) {
    return (
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
