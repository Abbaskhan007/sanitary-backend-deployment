import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  REGISTERATION_REQUEST,
  REGISTERATION_REQUEST_FAIL,
  REGISTERATION_REQUEST_SUCCESS,
  LOGOUT,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
} from "../Constants";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const initialState = { loading: false, error: false, user: user };

export const userReducer = (state = initialState, action) => {
  console.log("Action", action);
  switch (action.type) {
    case REGISTERATION_REQUEST:
      return { ...state, loading: true };
    case REGISTERATION_REQUEST_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case REGISTERATION_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_REQUEST_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("seller");
      return { ...state, user: {} };
    case UPDATE_PROFILE:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case DELETE_ACCOUNT:
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      return { ...state, user: [] };
    default:
      return state;
  }
};
