import {
  INITIALIZE_PLAYERS,
  PLACE_SHIP,
  GENERATE_COMPUTER_SHIPS,
  FIRE_SHOT,
} from "../actions/types";

const playersReducer = (state = {}, action) => {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case INITIALIZE_PLAYERS:
      return { ...state, ...payload };

    case PLACE_SHIP:
      newState = { ...state };
      newState.player1.gameBoard.manualShipLocations(
        payload.coord,
        payload.ship,
        payload.direction
      );
      return newState;

    case GENERATE_COMPUTER_SHIPS:
      newState = { ...state };
      newState.player2.gameBoard.generateShipLocations();
      return newState;

    case FIRE_SHOT:
      newState = { ...state };
      newState[payload.attacker].fire(
        payload.coord,
        newState[payload.receiver].gameBoard
      );
      return newState;

    default:
      return state;
  }
};

export default playersReducer;
