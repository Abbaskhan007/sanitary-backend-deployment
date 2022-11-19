import {
  ADD_TO_CART,
  ADD_TO_CART_LOCAL,
  CART_DATA_REQUEST,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_DETAILS,
  SELECT_SHIPPING_ADDRESS,
  UPDATE_CART,
} from "../Constants";

const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = { cart: initialCart, shipping: {}, payment: "bank" };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_DATA_REQUEST:
      return { ...state, cart: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    case UPDATE_CART:
      return { ...state, cart: action.payload };
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, payment: action.payload };
    case SAVE_SHIPPING_DETAILS:
      return { ...state, shipping: action.payload };
    case EMPTY_CART:
      localStorage.removeItem("cart");
      return { ...state, cart: [] };


    case ADD_TO_CART_LOCAL:
      const exist = state.cart.find(
        item => item.product._id === action.payload.product._id
      );

      console.log("Exist", exist);

      console.log(action.payload);
      if (!exist) {
        console.log("In exist *************");
        const updatedCart = [
          ...state.cart,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
            _id: "",
          },
        ];
        console.log("Updated Cart", updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return { ...state, cart: updatedCart };
      } else {
        const updatedCart = state.cart.map(item => {
          if (item.product._id === action.payload.product._id) {
            return { ...item, quantity: action.payload.quantity };
          } else {
            return item;
          }
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      }
    default:
      return state;
  }
};
