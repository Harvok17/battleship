import React from "react";
import Grid from "../Grid/Grid";
import {
  HitMark,
  MissMark,
  Square,
} from "../styled-components/gameWindowStyles";

const EnemySquares = ({ start, end, player, handleAttack }) => {
  return (
    <tr>
      {player.gameBoard.board.slice(start, end).map((square) => (
        <Square
          key={square.coord}
          className={square.isSunk && square.shipPart}
          sunk={square.isSunk}
          enemy
          onClick={() => {
            handleAttack(square);
          }}
        >
          {!square.occupied && square.shot ? (
            <MissMark>{"\u2715"}</MissMark>
          ) : square.occupied && square.shot ? (
            <HitMark>{"\u274C"}</HitMark>
          ) : null}
        </Square>
      ))}
    </tr>
  );
};

export default Grid(EnemySquares);
