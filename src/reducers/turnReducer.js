import { TURN } from "../actions/types";

const turnReducer = (state = 0, action) => {
  const { type, payload } = action;
  switch (type) {
    case TURN:
      return (state = payload);
    default:
      return state;
  }
};

export default turnReducer;
