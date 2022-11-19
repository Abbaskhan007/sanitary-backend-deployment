import { FETCH_SELLER_DATA, LOGOUT } from "../Constants";

const seller = localStorage.getItem("seller")
  ? JSON.parse(localStorage.getItem("seller"))
  : {};

export const sellerReducer = (state = seller, action) => {
  switch (action.type) {
    case FETCH_SELLER_DATA:
      return { ...action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
