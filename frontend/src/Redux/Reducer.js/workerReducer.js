import {
  WORKER_FETCH_FAILURE,
  WORKER_FETCH_REQUEST,
  WORKER_FETCH_SUCCESS,
} from "../Constants";

const initialState = { loading: false, error: null, data: [] };

export const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKER_FETCH_REQUEST:
      return { loading: true, error: false, data: [] };
    case WORKER_FETCH_SUCCESS:
      return { loading: false, error: false, data: action.payload };
    case WORKER_FETCH_FAILURE:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
