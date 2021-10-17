import React from "react";
import { Square } from "../styled-components/gameWindowStyles";
import Grid from "../Grid/Grid";

const SetupSquares = ({
  start,
  end,
  player,
  hovered,
  handlePlaceShip,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <tr>
      {player.gameBoard.board.slice(start, end).map((square) => (
        <Square
          key={square.coord}
          highlight={hovered.includes(square.coord)}
          occupied={square.occupied}
          className={square.shipPart}
          onClick={() => {
            handlePlaceShip(square.coord, player.gameBoard);
          }}
          onMouseEnter={() => {
            handleMouseEnter(square.coord, player.gameBoard);
          }}
          onMouseLeave={handleMouseLeave}
        ></Square>
      ))}
    </tr>
  );
};

export default Grid(SetupSquares);
