import { combineReducers } from "redux";
import { RESET } from "../actions/types";
import playersReducer from "./playersReducer";
import resultReducer from "./resultReducer";
import screenReducer from "./screenReducer";
import turnReducer from "./turnReducer";

const appReducer = combineReducers({
  players: playersReducer,
  screen: screenReducer,
  turn: turnReducer,
  winner: resultReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
