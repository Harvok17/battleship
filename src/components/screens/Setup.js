import React, { useState } from "react";
import {
  Wrapper,
  GridWrapper,
  Button,
  ButtonsWrapper,
} from "../styled-components/gameWindowStyles";
import { placeShip, resetBoard, gameStart } from "../../actions";
import { connect } from "react-redux";

import shipTypes from "../../shipTypes";

import SetupSquares from "../boards/SetupSquares";

const Setup = ({ player1, placeShip, resetBoard, gameStart }) => {
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState("horizontal");
  const [hovered, setHovered] = useState([]);

  const handleChangeDirection = () => {
    if (direction === "horizontal") {
      setDirection("vertical");
    } else {
      setDirection("horizontal");
    }
  };

  const handlePlaceShip = (coord, gameBoard) => {
    if (count === shipTypes.length) return;

    const locations = gameBoard.manualLocations(
      coord,
      shipTypes[count],
      direction
    );

    if (gameBoard.outOfBounds(locations) || gameBoard.collision(locations))
      return;

    placeShip({ coord, ship: shipTypes[count], direction });
    setCount(count + 1);
  };

  const handleMouseEnter = (coord, gameBoard) => {
    if (count === shipTypes.length) return;
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

  const handleResetBoard = () => {
    resetBoard();
    setCount(0);
    setDirection("horizontal");
  };

  const handleStartGame = () => {
    gameStart();
    setCount(0);
    setDirection("horizontal");
  };

  return (
    <Wrapper>
      <GridWrapper>
        {count === shipTypes.length ? "All ships are set!" : "Place your ships"}
        <Button mini onClick={handleChangeDirection}>
          {direction}
        </Button>
        <SetupSquares
          player={player1}
          hovered={hovered}
          handlePlaceShip={handlePlaceShip}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        {count === shipTypes.length ? (
          <ButtonsWrapper>
            <Button mini onClick={handleStartGame}>
              Play
            </Button>
            <Button mini onClick={handleResetBoard}>
              Reset
            </Button>
          </ButtonsWrapper>
        ) : (
          `${shipTypes[count].type[0].toUpperCase()}${shipTypes[
            count
          ].type.slice(1)}`
        )}
      </GridWrapper>
    </Wrapper>
  );
};

const mapStateToProps = ({ players: { player1 } }) => ({ player1 });

export default connect(mapStateToProps, { placeShip, resetBoard, gameStart })(
  Setup
);
