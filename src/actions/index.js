import {
  INITIALIZE_PLAYERS,
  PLACE_SHIP,
  GENERATE_COMPUTER_SHIPS,
  FIRE_SHOT,
  RESET,
  SETUP,
  GAME,
  RESULT,
  TURN,
  WINNER,
} from "./types";

export const initializePlayers = (players) => {
  return {
    type: INITIALIZE_PLAYERS,
    payload: players,
  };
};

export const placeShip = (details) => {
  return {
    type: PLACE_SHIP,
    payload: details,
  };
};

export const generateComputerShips = () => {
  return {
    type: GENERATE_COMPUTER_SHIPS,
  };
};

export const fireShot = ({ coord, attacker, receiver }) => {
  return {
    type: FIRE_SHOT,
    payload: { coord, attacker, receiver },
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const setup = () => {
  return {
    type: SETUP,
  };
};

export const gameStart = () => {
  return {
    type: GAME,
  };
};

export const showResult = () => {
  return {
    type: RESULT,
  };
};

export const setTurn = (turn) => {
  return {
    type: TURN,
    payload: turn,
  };
};

export const declareWinner = (winner) => {
  return {
    type: WINNER,
    payload: winner,
  };
};
