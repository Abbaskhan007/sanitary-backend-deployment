import { MODEL_CLOSE, MODEL_OPEN } from "../Constants";

const initialState = {
  modelOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  console.log("Model Request", action);
  switch (action.type) {
    case MODEL_OPEN:
      return { ...state, modelOpen: true };
    case MODEL_CLOSE:
      return { ...state, modelOpen: false };
    default:
      return state;
  }
};
