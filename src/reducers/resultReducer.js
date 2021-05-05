import { WINNER } from "../actions/types";

const resultReducer = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case WINNER:
      return (state = payload);
    default:
      return state;
  }
};

export default resultReducer;
