import React from "react";
import Cell from "./Cell";

const Board = ({ board, onColumnClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <Cell
              key={colIndex}
              value={cell}
              onClick={() => onColumnClick(colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
