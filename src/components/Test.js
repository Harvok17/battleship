import Player from "../factories/Player";
import {
  initializePlayers,
  placeShip,
  generateComputerShips,
  fireShot,
} from "../actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import "./Test.css";
import shipTypes from "../shipTypes";
import computerAi from "../computerAi";

function Test(props) {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState("horizontal");
  const [hovered, setHovered] = useState([]);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    if (count > 4) setGameStart(true);
  }, [count]);

  ///////FUNCTIONS//////
  const handleCreatePlayers = () => {
    if (props.players.human && props.players.computer) return;

    const human = new Player("human");
    const computer = new Player("computer");

    props.initializePlayers({ human, computer });
    props.generateComputerShips();
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
    const gameBoard = props.players.human.gameBoard;
    const locations = gameBoard.manualLocations(coord, ship, direction);

    if (gameBoard.outOfBounds(locations) || gameBoard.collision(locations))
      return;

    props.placeShip({ coord, ship, direction });
    setCount(count + 1);
  };

  const handleMouseEnter = (coord, gameBoard) => {
    if (gameStart) return;
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
    if (square.shot) return;

    props.fireShot({
      coord: square.coord,
      attacker: "human",
      receiver: "computer",
    });

    const computerShot = computerAi(props.players.human.gameBoard.board);
    props.fireShot({
      coord: computerShot,
      attacker: "computer",
      receiver: "human",
    });
  };

  const renderPlayerSquares = (start, end, player) => {
    return (
      <tr>
        {player.gameBoard.board.slice(start, end).map((square) => (
          <td
            style={
              square.occupied
                ? { backgroundColor: "darkblue" }
                : { backgroundColor: "none" }
            }
            className={`${square.shipPart || ""}${
              hovered.includes(square.coord)
                ? "square-hover"
                : gameStart
                ? ""
                : "not-allowed"
            }`}
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
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                H
              </span>
            ) : square.occupied === false && square.shot === true ? (
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                M
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
            style={
              square.occupied
                ? { backgroundColor: "darkblue" }
                : { backgroundColor: "none" }
            }
            className={`${square.shipPart || ""} highlight`}
            key={square.coord}
            onClick={() => {
              handleAttack(square);
            }}
          >
            {square.occupied === true && square.shot === true ? (
              <span
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                H
              </span>
            ) : square.occupied === false && square.shot === true ? (
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                M
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
      <br />
      <br />
      {props.players.human ? (
        <>
          {renderTable(renderPlayerSquares, props.players.human)}
          Human
        </>
      ) : null}

      <br />
      <br />
      {gameStart ? (
        <>
          {renderTable(renderComputerSquares, props.players.computer)}Computer
        </>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

export default connect(mapStateToProps, {
  initializePlayers,
  placeShip,
  generateComputerShips,
  fireShot,
})(Test);
