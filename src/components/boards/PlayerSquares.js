import React from "react";
import {
  HitMark,
  MissMark,
  Square,
} from "../styled-components/gameWindowStyles";
import Grid from "./Grid";

const PlayerSquares = ({ start, end, player }) => (
  <tr>
    {player.gameBoard.board.slice(start, end).map((square) => {
      return (
        <Square
          key={square.coord}
          occupied={square.occupied}
          className={square.shipPart}
          sunk={square.isSunk}
          player
        >
          {!square.occupied && square.shot ? (
            <MissMark>{"\u2715"}</MissMark>
          ) : square.occupied && square.shot ? (
            <HitMark>{"\u274C"}</HitMark>
          ) : null}
        </Square>
      );
    })}
  </tr>
);

export default Grid(PlayerSquares);
