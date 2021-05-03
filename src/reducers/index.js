import { combineReducers } from "redux";
import playersReducer from "./playersReducer";
import { RESET } from "../actions/types";

const appReducer = combineReducers({
  players: playersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
