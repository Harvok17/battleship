import React from "react";
import {
  Wrapper,
  GridWrapper,
  BattlefieldWrapper,
  Notifier,
} from "../components/styled-components/gameWindowStyles";

import { connect } from "react-redux";

import { fireShot, setTurn, showResult, declareWinner } from "../actions";

import { AiMove } from "../ComputerAI";
import { PlayerSquares, EnemySquares } from "../components";

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
          display={turn === 0 || turn === 3 || turn === 4 ? "none" : "flex"}
        >
          {player1.name} Ships
          <PlayerSquares player={player1} />
          Ships Left: {player1.gameBoard.shipsLeft}
        </GridWrapper>

        <Notifier
          display={!turn || turn === 1 ? "none" : "block"}
          color={
            !turn || turn === 1
              ? "white"
              : turn === 3 || turn === 5
              ? "red"
              : "limegreen"
          }
        >
          {!turn
            ? "Your turn"
            : turn === 1
            ? "Enemy turn"
            : turn === 3 || turn === 5
            ? "Miss"
            : "Hit!"}
        </Notifier>

        <GridWrapper
          turn={turn}
          opacity={turn === 1 || turn === 5 || turn === 6 ? "0.5" : "1"}
          background={
            turn === 1 || turn === 5 || turn === 6 ? "" : "hsl(0, 0%, 12.82%)"
          }
          display={turn === 1 || turn === 5 || turn === 6 ? "none" : "flex"}
        >
          {player2.name} Ships
          <EnemySquares player={player2} handleAttack={handleAttack} />
          Ships Left: {player2.gameBoard.shipsLeft}
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
