import React from "react";
import Disc from "./Disc";

const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value && <Disc color={value} />}
    </div>
  );
};

export default Cell;
