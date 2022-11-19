import { GET_WORKERS_CATEGORIES } from "../Constants";

const initialState = [];

export const workerCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORKERS_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
