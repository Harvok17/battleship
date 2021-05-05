import { GAME, RESULT, SETUP } from "../actions/types";

const screenReducer = (state = "start", action) => {
  switch (action.type) {
    case SETUP:
      return (state = "setup");
    case GAME:
      return (state = "game");
    case RESULT:
      return (state = "result");
    default:
      return state;
  }
};

export default screenReducer;
