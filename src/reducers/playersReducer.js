import {
  INITIALIZE_PLAYERS,
  PLACE_SHIP,
  GENERATE_COMPUTER_SHIPS,
} from "../actions/types";

const playersReducer = (state = {}, action) => {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case INITIALIZE_PLAYERS:
      return { ...state, ...payload };

    case PLACE_SHIP:
      const { coord, ship, direction } = payload;
      newState = { ...state };
      const { human } = newState;
      human.gameBoard.manualShipLocations(coord, ship, direction);
      return newState;

    case GENERATE_COMPUTER_SHIPS:
      newState = { ...state };
      const { computer } = newState;
      computer.gameBoard.generateShipLocations();
      return newState;

    default:
      return state;
  }
};

export default playersReducer;
