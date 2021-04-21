import {
  INITIALIZE_PLAYERS,
  PLACE_SHIP,
  GENERATE_COMPUTER_SHIPS,
  FIRE_SHOT,
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
