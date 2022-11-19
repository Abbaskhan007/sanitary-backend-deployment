import { GET_CATEGORIES, GET_WORKERS_CATEGORIES } from "../Constants";

const initialState = {
  productCategories: [],
  workerCategories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, productCategories: action.payload };
    case GET_WORKERS_CATEGORIES:
      return { ...state, workerCategories: action.payload };
    default:
      return state;
  }
};
