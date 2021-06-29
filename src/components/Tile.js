import React from "react";

const Tile = (props) => {

  return (
    <div
      value={[props.id, props.row, props.cell, props.style]}
      className="tile"
      style={{ backgroundColor: props.style }}
    >
      {props.row} {props.cell}
    </div>
  );
};

export default Tile;
