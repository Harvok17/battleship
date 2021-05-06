import Player from "../factories/Player";
import {
  initializePlayers,
  placeShip,
  generateComputerShips,
  fireShot,
  reset,
  setup,
  gameStart,
  showResult,
  setTurn,
  declareWinner,
} from "../actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import "./Test.css";
import shipTypes from "../shipTypes";
import ComputerAI from "../ComputerAI";

let computerAI = new ComputerAI();

function Test(props) {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState("horizontal");
  const [hovered, setHovered] = useState([]);
  const {
    setup,
    gameStart,
    showResult,
    screen,
    setTurn,
    turn,
    reset,
    declareWinner,
    winner,
  } = props;

  useEffect(() => {
    if (count > 4) {
      gameStart();
    }
  }, [count, gameStart]);

  useEffect(() => {
    if (screen === "game") {
      console.log("GAME STARTS!");
      setHovered([]);
    }
  }, [screen]);

  ///////FUNCTIONS//////

  const handleCreatePlayers = () => {
    if (props.players.player1 && props.players.player2) return;

    const human = new Player("Human");
    const computer = new Player("Computer");

    props.initializePlayers({ player1: human, player2: computer });
    props.generateComputerShips();
    setup();
  };

  const handleChangeDirection = () => {
    if (direction === "horizontal") {
      setDirection("vertical");
    } else {
      setDirection("horizontal");
    }
  };

  const handlePlaceShip = (coord, ship, direction) => {
    if (count > 4) return;
    const gameBoard = props.players.player1.gameBoard;
    const locations = gameBoard.manualLocations(coord, ship, direction);

    if (gameBoard.outOfBounds(locations) || gameBoard.collision(locations))
      return;

    props.placeShip({ coord, ship, direction });
    setCount(count + 1);
  };

  const handleMouseEnter = (coord, gameBoard) => {
    if (screen === "game" || screen === "result") return;
    const shipLength = shipTypes[count].length;
    const locations = [];
    for (let i = 0; i < shipLength; i++) {
      direction === "horizontal"
        ? locations.push(coord + i)
        : locations.push(coord + i * 10);
    }

    if (gameBoard.collision(locations) || gameBoard.outOfBounds(locations))
      return;
    setHovered(locations);
  };

  const handleMouseLeave = () => {
    setHovered([]);
  };

  const handleAttack = (square) => {
    const { player1, player2 } = props.players;

    if (square.shot || screen === "result" || turn === 1) return;

    props.fireShot({
      coord: square.coord,
      attacker: "player1",
      receiver: "player2",
    });

    if (player2.gameBoard.checkAllShipsSank()) {
      showResult();
      declareWinner(player1.name);
    } else if (!square.occupied && !turn) {
      setTurn(1);
      computerMove(player1, player2);
    }
  };

  const computerMove = (p1, p2) => {
    const computerShot = computerAI.move(p1.gameBoard);

    props.fireShot({
      coord: computerShot,
      attacker: "player2",
      receiver: "player1",
    });

    if (p1.gameBoard.checkAllShipsSank()) {
      showResult();
      declareWinner(p2.name);
    } else if (p1.gameBoard.board[computerShot].occupied && screen === "game") {
      setTimeout(() => {
        computerMove(p1, p2);
      }, 1000);
    } else {
      setTurn(0);
    }
  };

  const handleReset = () => {
    reset();
    setCount(0);
    setDirection("horizontal");
    computerAI = new ComputerAI();
  };

  const renderPlayerSquares = (start, end, player) => {
    return (
      <tr>
        {player.gameBoard.board.slice(start, end).map((square) => (
          <td
            style={
              square.occupied
                ? { backgroundColor: "royalblue" }
                : { backgroundColor: "none" }
            }
            className={`${square.shipPart || ""} ${
              hovered.includes(square.coord)
                ? "square-hover"
                : screen === "game" || screen === "result"
                ? ""
                : "not-allowed"
            } ${square.isSunk ? "sunk" : ""}`}
            key={square.coord}
            onClick={() => {
              handlePlaceShip(square.coord, shipTypes[count], direction);
            }}
            onMouseEnter={() =>
              handleMouseEnter(square.coord, player.gameBoard)
            }
            onMouseLeave={handleMouseLeave}
          >
            {square.occupied === true && square.shot === true ? (
              <span
                style={{
                  color: "red",
                }}
              >
                {"\u274C"}
              </span>
            ) : square.occupied === false && square.shot === true ? (
              <span
                style={{
                  color: "darkgrey",
                }}
              >
                {"\u2715"}
              </span>
            ) : null}
          </td>
        ))}
      </tr>
    );
  };

  const renderComputerSquares = (start, end, player) => {
    return (
      <tr>
        {player.gameBoard.board.slice(start, end).map((square) => (
          <td
            className={`${
              square.isSunk ? (square.shipPart || "") + " sunk" : ""
            } highlight`}
            key={square.coord}
            onClick={() => {
              handleAttack(square);
            }}
          >
            {square.occupied === true && square.shot === true ? (
              <span
                style={{
                  color: "red",
                }}
              >
                {"\u274C"}
              </span>
            ) : square.occupied === false && square.shot === true ? (
              <span
                style={{
                  color: "darkgrey",
                }}
              >
                {"\u2715"}
              </span>
            ) : null}
          </td>
        ))}
      </tr>
    );
  };

  const renderTable = (square, player) => {
    return player ? (
      <table>
        <tbody>
          {square(0, 10, player)}
          {square(10, 20, player)}
          {square(20, 30, player)}
          {square(30, 40, player)}
          {square(40, 50, player)}
          {square(50, 60, player)}
          {square(60, 70, player)}
          {square(70, 80, player)}
          {square(80, 90, player)}
          {square(90, 100, player)}
        </tbody>
      </table>
    ) : null;
  };

  ///////RENDER////////////////
  return (
    <>
      <button onClick={handleCreatePlayers}>Create Players</button>
      <button onClick={handleChangeDirection}>{direction}</button>
      {screen === "result" ? (
        <button onClick={handleReset}>Reset</button>
      ) : null}
      <br />
      <br />
      {screen === "result" ? <h1>Winner is: {winner}</h1> : null}
      {props.players.player1 && screen !== "result" ? (
        <>
          {renderTable(renderPlayerSquares, props.players.player1)}
          Player 1
          <br />
          Ships Left: {props.players.player1.gameBoard.shipsLeft}
        </>
      ) : null}

      <br />
      <br />
      {screen === "game" ? (
        <>
          {renderTable(renderComputerSquares, props.players.player2)}
          Player 2
          <br />
          Ships Left: {props.players.player2.gameBoard.shipsLeft}
        </>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
    screen: state.screen,
    turn: state.turn,
    winner: state.winner,
  };
};

export default connect(mapStateToProps, {
  initializePlayers,
  placeShip,
  generateComputerShips,
  fireShot,
  reset,
  setup,
  gameStart,
  showResult,
  setTurn,
  declareWinner,
})(Test);
