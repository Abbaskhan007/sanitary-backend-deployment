import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { connect } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import {
  ADD_TO_CART_LOCAL,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../Redux/Constants";
import Axios from "axios";
import ErrorBox from "./ErrorBox";
import url from "../Constants";

function CartItem({
  item,
  addToCartLocal,
  updateCart,
  user,
  deleteProduct,
  products,
  store,
}) {
  const [qty, setQty] = useState(item.quantity);
  const [outOfStock, setOutOfStock] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("Items in cart------", products);

  useEffect(() => {
    if (user.name) {
      updateCart({
        productId: item._id,
        userId: user._id,
        quantity: qty,
      });
    } else {
      addToCartLocal(item.product, qty);
    }
  }, [qty, products, store]);

  const qtyHandler = nums => {
    let num = parseInt(nums ? nums : 0);
    setOutOfStock(false);

    if (num + qty > item.product.inStock) {
      setOutOfStock(true);
    } else if (num < 1 && num + qty < 1) {
      return;
    } else {
      setQty(qty + num);
    }
  };

  const inputHandler = num => {
    setOutOfStock(false);

    if (num > item.product.inStock) {
      setOutOfStock(true);
    } else {
      setQty(parseInt(num));
    }
  };

  const deleteHandler = () => {
    console.log("Deleting");
    deleteProduct({
      userId: user._id,
      productId: item.product._id,
      quantity: item.quantity,
    });
  };

  return (
    <div className="flex mb-6 shadow-lg  rounded-lg  flex-row border border-gray-200 relative">
      <MdCancel
        onClick={deleteHandler}
        className="text-violet-500 text-lg absolute -top-[10px] -right-[10px] z-30 bg-white cursor-pointer"
        size={24}
      />
      <img
        className="sm:w-52 sm:h-52 w-36 h-36 rounded-tl-md rounded-bl-md "
        src={item.product?.images[0].url}
      />
      <div className="sm:p-2 sm:px-6 p-1 px-4">
        <p className="text-md sm:font-bold font-semibold sm:my-1 my-[2px]">
          {item.product.name}
        </p>
        <p className="sm:text-md text-sm font-medium sm:mb-1 mb-[2px]">
          Rs: {item.product.price}
        </p>
        <p className=" text-gray-500 sm:inline-flex hidden italic my-1">
          {item.product.description}
        </p>
        <p className="mb-2">
          <span className="sm:font-medium sm:text-base text-sm ">
            Category:{" "}
          </span>
          <span className="text-gray-500 sm:text-base text-sm">Basin's</span>
        </p>
        <p className="flex-1 sm:mt-3 sm:mb-3 mt-3 ">
          <div className="flex items-center ">
            <p
              className="bg-gray-50 py-3 p-3 border border-gray-200"
              onClick={() => qtyHandler(-1)}
            >
              <AiOutlineMinus className="sm:text-lg text-medium font-thin" />
            </p>
            <input
              placeholder="1"
              type="number"
              value={qty}
              className="sm:w-16 w-12 sm:py-[9px] py-[8px]  text-center outline-0  border-t border-b border-gray-200"
              onChange={e => inputHandler(e.target.value)}
              min={1}
            />

            <p
              className="bg-gray-50 py-3 p-3 border border-gray-200"
              onClick={() => qtyHandler(1)}
            >
              <IoAddOutline className="sm:text-lg text-medium font-thin" />
            </p>
          </div>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
    products: state.productList.products,
    store: state.store.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCart: async productData => {
      console.log("Product Data", productData);
      const { data } = await Axios.post(
        `${url}/cart/changeQuantity`,
        productData
      );
      console.log("Data", data);
      dispatch({
        type: UPDATE_CART,
        payload: data.products,
      });
    },
    deleteProduct: async productData => {
      const { data } = await Axios.delete(
        `${url}/cart/deleteProduct?productId=${productData.productId}&userId=${productData.userId}`
      );
      console.log("Data", data);
      dispatch({
        type: REMOVE_FROM_CART,
        payload: data.products,
      });
    },
    addToCartLocal: (product, qty) => {
      dispatch({
        type: ADD_TO_CART_LOCAL,
        payload: { product, quantity: qty },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
