import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { WORKER_FETCH_FAILURE, WORKER_FETCH_SUCCESS } from "../Redux/Constants";
import PriceSlider from "./PriceSlider";
import Axios from "axios";
import url from "../Constants";

function WorkerFilter({
  filterWorkers,
  showFilter,
  setShowFilter,
  categories,
  city,
  setCity,
  value,
  setValue,
}) {
  const min = 1;
  const max = 5000;

  const onChangeMax = num => {
    setValue({ ...value, max: num });
  };
  const onChangeMin = num => {
    setValue({ ...value, min: num });
  };

  const fadeOut = {
    visibility: "hidden",
    maxHeight: "0px",
    opacity: 0,
    transition: "visibility 0s linear 300ms, opacity 300ms",
  };
  const fadein = {
    margin: "32px 0px",
    visibility: "visible",
    opacity: 1,
    transition: "visibility 0s linear 100ms, opacity 300ms",
  };

  const onFilter = () => {
    const filterData = { ...value, categories, city };
    filterWorkers(filterData);
  };

  return (
    <div
      style={showFilter ? fadein : fadeOut}
      className={`  border-2 bg-gray-100 border-gray-300  py-4 px-12 rounded-md relative`}
    >
      <div
        onClick={() => setShowFilter(false)}
        className="border cursor-pointer bg-white  border-gray-200 w-[36px] py-1 rounded-full text-center flex justify-center absolute -right-3 -top-3 "
      >
        <IoCloseOutline size={28} />{" "}
      </div>
      <div className=" sm:flex flex-1 sm:space-x-8">
        <div className="flex-1">
          <p className="text-center mb-3 text-lg font-semibold text-gray-600">
            Minimum
          </p>
          <input
            className="w-full border-2 border-gray-300 py-1 px-2 rounded-lg"
            type="number"
            value={value.min}
            onChange={e => onChangeMin(e.target.value)}
            placeholder="Enter Minimum price"
          />
        </div>
        <div className="flex-1">
          <p className="text-center mb-3 text-lg font-semibold text-gray-600">
            Maximum
          </p>
          <input
            className="w-full border-2 border-gray-300 py-1 px-2 rounded-lg"
            type="number"
            value={value.max}
            onChange={e => onChangeMax(e.target.value)}
            placeholder="Enter Maximum price"
          />
        </div>
      </div>
      <PriceSlider
        worker={true}
        value={value}
        setValue={setValue}
        max={max}
        min={min}
        step={10}
        formatLabel={value => `Rs. ${value}`}
      />

      <input
        type="text"
        className="w-full p-2 border-2 border-gray-300 rounded-md mb-6 outline-none"
        placeholder="Enter Worker Location"
        value={city}
        onChange={e => setCity(e.target.value)}
      />

      <div
        onClick={onFilter}
        className="border-2 border-gray-600 text-center py-[6px] my-4 text-gray-700 cursor-pointer hover:bg-gray-200 mx-auto text-xl font-medium rounded-md w-[200px]"
      >
        Apply Filter
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    filterWorkers: async filterData => {
      try {
        const { data } = await Axios.post(
          `${url}/worker/filterWorkers`,
          filterData
        );
        console.log("Workers Data --", data);
        dispatch({ type: WORKER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: WORKER_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerFilter);
