import React from "react";
import RatingStars from "./RatingStars";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import Axios from "axios";
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
} from "../Redux/Constants";

function ProductCard({ product, seller, fetchProducts }) {
  const navigate = useNavigate();

  const onDelete = async e => {
    e.stopPropagation();
    try {
      const response = await Axios.delete(
        `/api/products/delete/${product._id}`
      );
      console.log("Response", response);
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (err) {
      alert(err);
    }
  };

  console.log("_______________________", product);

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className={`border-2 border-gray-200 shadow-lg rounded-lg cursor-pointer transition hover:scale-105 ease-in-out delay-100 duration-300 overflow-hidden flex flex-col ${
        product.seller === seller && "group relative"
      }`}
    >
      {product.seller === seller && (
        <div className="hidden group-hover:flex absolute inset-0 bg-black/60 items-center justify-center space-x-8 hover:cursor-default">
          <div
            onClick={e => {
              e.stopPropagation();
              navigate(`editProduct/${product._id}`);
            }}
            className="text-white z-40  flex-col items-center text-center cursor-pointer"
          >
            <MdModeEditOutline className="mx-auto mb-1 z-40" size={24} />
            <label>Edit</label>
          </div>
          <div className="text-white cursor-pointer" onClick={e => onDelete(e)}>
            <MdDelete className="mx-auto mb-1" size={24} />
            <label>Delete</label>
          </div>
        </div>
      )}
      <img
        className="w-full flex-1 object-cover max-h-[225px]"
        src={product.images[0].url}
      />
      <div className="p-2 px-4">
        <p className="text-lg   my-1">{product.name}</p>
        <p className="text-sm text-gray-500 font-medium">Rs. {product.price}</p>
        <div className="flex items-center space-x-2">
          <RatingStars
            numRating={product.reviews.length}
            rating={product.rating}
          />
          <p className="text-gray-400 text-sm">({product.ratings.length})</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    seller: state.seller?._id,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async () => {
      dispatch({ type: PRODUCT_FETCH_REQUEST });
      try {
        const { data } = await Axios.get("/api/products/getProducts");
        dispatch({
          type: PRODUCT_FETCH_REQUEST_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
