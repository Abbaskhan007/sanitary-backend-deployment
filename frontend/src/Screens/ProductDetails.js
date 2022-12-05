import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSearchParams, useParams, NavLink } from "react-router-dom";
import Loading from "../Components/Loading";
import ErrorBox from "../Components/ErrorBox";
import RatingStars from "../Components/RatingStars";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import Slider from "../Components/Slider";
import { connect } from "react-redux";
import { ADD_TO_CART, ADD_TO_CART_LOCAL } from "../Redux/Constants";
import ReviewBox from "../Components/ReviewBox";
import url from "../Constants";

function ProductDetails({
  addToCartAction,
  user,
  cart,
  addToCartLocal,
  seller,
}) {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const [qty, setQty] = useState(1);
  const [outOfStock, setOutOfStock] = useState(false);

  const { productId } = useParams();

  console.log("Product Details Cart", cart);

  console.log("Params", productId);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await Axios.get(`${url}/products/getProduct/${productId}`);
      setProductData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      seterror(err.message);
    }
  };

  const qtyHandler = nums => {
    let num = parseInt(nums ? nums : 0);
    setOutOfStock(false);

    if (num + qty > productData.inStock) {
      setOutOfStock(true);
    } else if (num < 1 && num + qty < 1) {
      return;
    } else {
      setQty(qty + num);
    }
  };

  const inputHandler = num => {
    setOutOfStock(false);

    if (num > productData.inStock) {
      setOutOfStock(true);
    } else {
      setQty(parseInt(num));
    }
  };

  console.log("Qty", qty);

  const addToCart = () => {
    if (!user.user.name) {
      addToCartLocal(productData, qty);
    } else {
      addToCartAction(
        {
          user: user.user._id,
          products: { product: productData._id, quantity: qty },
        },
        user
      );
    }
  };

  console.log("Product Data---------", productData);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorBox variant="fail" message={error} />
  ) : (
    <div>
      <div
        className={` relative flex flex-col flex-1 space-x-0 md:space-x-8 space-y-8 md:flex-row md:items-center py-4 px-6 box-border sm:flex-col sm:px-10 ${
          seller === productData.seller && "mt-4"
        }`}
      >
        {seller === productData.seller && (
          <NavLink
            className="absolute top-0 right-4 bg-blue-500 text-white px-4 py-[6px] rounded-md text-sm font-medium"
            to={`/productAnalytics/${productData._id}`}
          >
            View Analytics
          </NavLink>
        )}
        <div className="flex-1 sm:px-10">
          <Slider images={productData.images} />
        </div>
        <div className="flex-1">
          <p className="text-4xl font-light">{productData.name}</p>
          <p className="w-16 border-b-[2px] my-2 border-black"></p>
          <p className="font-semibold text-md my-4">{`Rs. ${productData.price}`}</p>
          <div className="flex flex-row items-center">
            <RatingStars rating={productData.rating} />
            <p className="ml-2 text-gray-600">({productData.ratings.length})</p>
          </div>
          <div className="flex my-4 items-center">
            <img
              className="h-10 w-10 rounded-full border border-gray-300 p-1 mr-2"
              src={productData?.store.image}
            />
            <p className="text-medium font-semibold">
              {productData?.store?.name}
            </p>
          </div>
          <p className="text-sm font-normal italic">
            {productData.description}
          </p>
          <p className="text-sm text-gray-600 mb-2 mt-4">QTY</p>
          <div className="flex items-center">
            <p
              className="bg-gray-50 py-3 p-4 border border-gray-200"
              onClick={() => qtyHandler(-1)}
            >
              <AiOutlineMinus className="text-lg font-thin" />
            </p>
            <input
              placeholder="1"
              type="number"
              value={qty}
              className="w-24 py-[9px]  text-center outline-0  border-t border-b border-gray-200"
              onChange={e => inputHandler(e.target.value)}
              min={1}
            />

            <p
              className="bg-gray-50 py-3 p-4 border border-gray-200"
              onClick={() => qtyHandler(1)}
            >
              <IoAddOutline className="text-lg font-thin" />
            </p>
          </div>
          <button
            onClick={addToCart}
            disabled={outOfStock}
            className={`${
              outOfStock ? "bg-violet-100" : "bg-violet-500 "
            }  text-white p-2 px-4 my-6 rounded`}
          >
            ADD TO CART
          </button>
          {outOfStock ? (
            <ErrorBox variant="fail" message="Out of Stock" />
          ) : null}
        </div>
      </div>
      <div>
        <p className="text-lg text-center underline underline-offset-4 my-4">
          Ratings and Reviews
        </p>

        {productData?.reviews?.map(review => (
          <ReviewBox
            review={{
              ...review,
              customerId: review.user,
              review: review.message,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("State PD: ", state);
  return {
    user: state.user,
    cart: state.cart,
    seller: state.seller._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCartAction: async item => {
      console.log("Item: ", item);
      const { data } = await Axios.post(`${url}/cart/addToCart`, item);
      dispatch({
        type: ADD_TO_CART,
        payload: data.products,
      });
      console.log("Data", data);
    },
    addToCartLocal: (product, qty) => {
      dispatch({
        type: ADD_TO_CART_LOCAL,
        payload: { product, quantity: qty },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
