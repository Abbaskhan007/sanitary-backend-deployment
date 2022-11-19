import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
  PRODUCT_SEARCH,
} from "../Constants";

const initialState = { loading: true, error: null, products: [] };

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_FETCH_REQUEST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case PRODUCT_FETCH_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case PRODUCT_SEARCH:
      return { ...state, loading: false, products: action.payload };
    default:
      return state;
  }
};
