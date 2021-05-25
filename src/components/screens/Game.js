import React from "react";
import {
  Wrapper,
  GridWrapper,
  BattlefieldWrapper,
} from "../styled-components/gameWindowStyles";

import { connect } from "react-redux";

import { fireShot, setTurn, showResult, declareWinner } from "../../actions";
import PlayerSquares from "../boards/PlayerSquares";
import EnemySquares from "../boards/EnemySquares";
import { AiMove } from "../../ComputerAI";

const Game = ({
  player1,
  player2,
  turn,
  setTurn,
  showResult,
  declareWinner,
  fireShot,
}) => {
  const handleAttack = (square) => {
    if (
      square.shot ||
      turn === 1 ||
      turn === 3 ||
      turn === 4 ||
      turn === 5 ||
      turn === 6
    )
      return;

    fireShot({
      coord: square.coord,
      attacker: "player1",
      receiver: "player2",
    });

    if (player2.gameBoard.checkAllShipsSank()) {
      setTurn(4);
      declareWinner(player1.name);
      setTimeout(() => showResult(), 1500);
    } else if (!square.occupied && !turn) {
      setTurn(3);
      setTimeout(() => setTurn(1), 1000);
      setTimeout(() => computerMove(player1, player2), 2000);
    } else {
      setTurn(4);
      setTimeout(() => setTurn(0), 1000);
    }
  };

  const computerMove = (p1, p2) => {
    const computerShot = AiMove(p1.gameBoard);

    fireShot({
      coord: computerShot,
      attacker: "player2",
      receiver: "player1",
    });

    if (p1.gameBoard.checkAllShipsSank()) {
      declareWinner(p2.name);
      setTimeout(() => showResult(), 1500);
    }

    if (p1.gameBoard.board[computerShot].occupied) {
      setTimeout(() => setTurn(6), 500);
      setTimeout(() => setTurn(1), 1000);
      setTimeout(() => {
        computerMove(p1, p2);
      }, 2000);
    } else {
      setTurn(5);
      setTimeout(() => setTurn(0), 1000);
    }
  };

  return (
    <Wrapper>
      <BattlefieldWrapper>
        <GridWrapper
          opacity={turn === 0 || turn === 3 || turn === 4 ? "0.5" : "1"}
          background={
            turn === 0 || turn === 3 || turn === 4 ? "" : "hsl(0, 0%, 12.82%)"
          }
        >
          {player1.name} Ships
          <PlayerSquares player={player1} />
          Ships Left:
          {player1.gameBoard.shipsLeft}
        </GridWrapper>

        <span>
          {!turn
            ? "Your turn"
            : turn === 1
            ? "Enemy turn"
            : turn === 3 || turn === 5
            ? "Miss"
            : "Hit!"}
        </span>

        <GridWrapper
          opacity={turn === 1 || turn === 5 || turn === 6 ? "0.5" : "1"}
          background={
            turn === 1 || turn === 5 || turn === 6 ? "" : "hsl(0, 0%, 12.82%)"
          }
        >
          {player2.name} Ships
          <EnemySquares player={player2} handleAttack={handleAttack} />
          Ships Left:
          {player2.gameBoard.shipsLeft}
        </GridWrapper>
      </BattlefieldWrapper>
    </Wrapper>
  );
};

const mapStateToProps = ({ players: { player1, player2 }, turn }) => ({
  player1,
  player2,
  turn,
});

export default connect(mapStateToProps, {
  fireShot,
  setTurn,
  showResult,
  declareWinner,
})(Game);
