import React from "react";
import RatingStars from "./RatingStars";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { connect } from "react-redux";
import Axios from "axios";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";
import axios from "axios";
import url from "../Constants";

function StoreCard({ store, seller, fetchStoreData }) {
  const navigate = useNavigate();

  const onDelete = async e => {
    e.stopPropagation();

    const response = await Axios.delete(`${url}/stores/deleteStore/${store._id}`);
    console.log("Delete Response", response);
    if (response.status === 200) {
      fetchStoreData();
    } else {
    }
  };

  return (
    <div
      onClick={() => navigate(`${store._id}`)}
      className={`border-2 border-gray-200 shadow-lg rounded-lg cursor-pointer transition hover:scale-105 ease-in-out duration-300 delay-100 overflow-hidden flex flex-col ${
        store.seller?._id === seller && "group relative"
      }`}
    >
      {store.seller?._id === seller && (
        <div className="hidden group-hover:flex absolute inset-0 bg-black/60 items-center justify-center space-x-8 hover:cursor-default">
          <div
            onClick={e => {
              e.stopPropagation();
              navigate(`/sellerDashboard/editStore/${store._id}`);
            }}
            className="text-white z-40  flex-col items-center text-center cursor-pointer"
          >
            <MdModeEditOutline className="mx-auto mb-1 z-40" size={24} />
            <label>Edit</label>
          </div>
          <div onClick={e => onDelete(e)} className="text-white cursor-pointer">
            <MdDelete className="mx-auto mb-1" size={24} />
            <label>Delete</label>
          </div>
        </div>
      )}
      <img className="flex-1 object-cover max-h-[225px]" src={store.image} />
      <div className="p-2">
        <p className="text-lg font-medium mb-1">{store.name}</p>
        <div className="flex flex-row items-center flex-wrap">
          <p className="text-sm font-medium">Categories: </p>
          <span className="border border-gray-300 px-1 py-1 text-xs  rounded-md font-normal text-gray-500 ml-2">
            {store.category[0]}
          </span>{" "}
          {store.category.length > 1 && (
            <span className="bg-gray-200 text-gray-500  p-2  rounded-full text-xs ml-3">
              {store.category.length - 1} +
            </span>
          )}
        </div>
        
        <div className="flex space-x-2 py-2">
          <RatingStars rating={store.rating} />
          <p className="text-gray-400 text-sm">({store.ratings.length})</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    seller: state.seller?._id,
    //store: state.store.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStoreData: async () => {
      dispatch({ type: STORE_FETCH_REQUEST });

      try {
        const { data } = await axios.get(`${url}/stores/getStores`);
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({ type: STORE_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreCard);
