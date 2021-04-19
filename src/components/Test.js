import Player from "../factories/Player";
import {
  initializePlayers,
  placeShip,
  generateComputerShips,
} from "../actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import "./Test.css";
import shipTypes from "../shipTypes";

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

    if (gameBoard.outOfBounds(locations) && gameBoard.collision(locations))
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

  const renderPlayerCells = (start, end, player) => {
    return (
      <tr>
        {player.gameBoard.board.slice(start, end).map((cell) => (
          <td
            style={
              cell.occupied
                ? { backgroundColor: "darkblue" }
                : { backgroundColor: "none" }
            }
            className={`${cell.shipPart} ${
              hovered.includes(cell.coord) ? "cell-hover" : "not-allowed"
            }`}
            key={cell.coord}
            onClick={() => {
              handlePlaceShip(cell.coord, shipTypes[count], direction);
            }}
            onMouseEnter={() => handleMouseEnter(cell.coord, player.gameBoard)}
            onMouseLeave={handleMouseLeave}
          >
            {cell.occupied === true && cell.shot === true ? (
              <span style={{ color: "green", fontWeight: "bold" }}>H</span>
            ) : cell.occupied === false && cell.shot === true ? (
              <span style={{ color: "red", fontWeight: "bold" }}>M</span>
            ) : null}
          </td>
        ))}
      </tr>
    );
  };

  const renderComputerCells = (start, end, player) => {
    return (
      <tr>
        {player.gameBoard.board.slice(start, end).map((cell) => (
          <td
            style={
              cell.occupied
                ? { backgroundColor: "darkblue" }
                : { backgroundColor: "none" }
            }
            className={cell.shipPart}
            key={cell.coord}
          >
            {cell.occupied === true && cell.shot === true ? (
              <span style={{ color: "green", fontWeight: "bold" }}>H</span>
            ) : cell.occupied === false && cell.shot === true ? (
              <span style={{ color: "red", fontWeight: "bold" }}>M</span>
            ) : null}
          </td>
        ))}
      </tr>
    );
  };

  const renderTable = (cell, player) => {
    return player ? (
      <table>
        <tbody>
          {cell(0, 10, player)}
          {cell(10, 20, player)}
          {cell(20, 30, player)}
          {cell(30, 40, player)}
          {cell(40, 50, player)}
          {cell(50, 60, player)}
          {cell(60, 70, player)}
          {cell(70, 80, player)}
          {cell(80, 90, player)}
          {cell(90, 100, player)}
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
      {renderTable(renderPlayerCells, props.players.human)}
      Human
      <br />
      <br />
      {gameStart ? (
        <>{renderTable(renderComputerCells, props.players.computer)}Computer</>
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
})(Test);
