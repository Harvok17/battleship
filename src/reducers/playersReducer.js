import {
  INITIALIZE_PLAYERS,
  PLACE_SHIP,
  GENERATE_COMPUTER_SHIPS,
  FIRE_SHOT,
  RESET_BOARD,
} from "../actions/types";

const playersReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case INITIALIZE_PLAYERS:
      return { ...state, ...payload };

    case PLACE_SHIP: {
      const newState = { ...state };
      newState.player1.gameBoard.manualShipLocations(
        payload.coord,
        payload.ship,
        payload.direction
      );
      return { ...newState };
    }

    case RESET_BOARD: {
      const newState = { ...state };
      newState.player1.gameBoard.resetBoard();
      return { ...newState };
    }

    case GENERATE_COMPUTER_SHIPS: {
      const newState = { ...state };
      newState.player2.gameBoard.generateShipLocations();
      return { ...newState };
    }

    case FIRE_SHOT: {
      const newState = { ...state };
      newState[payload.attacker].fire(
        payload.coord,
        newState[payload.receiver].gameBoard
      );
      return { ...newState };
    }

    default:
      return state;
  }
};

export default playersReducer;
