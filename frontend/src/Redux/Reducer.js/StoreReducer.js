const {
  STORE_FETCH_REQUEST,
  STORE_FETCH_FAILURE,
  STORE_FETCH_SUCCESS,
} = require("../Constants");

const initialState = { loading: true, error: null, data: [] };

export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_FETCH_REQUEST:
      return { ...state, loading: true };
    case STORE_FETCH_FAILURE:
      return { loading: false, error: action.payload, data: [] };
    case STORE_FETCH_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    default:
      return state;
  }
};
