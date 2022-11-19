import Axios from "axios";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { PRODUCT_FETCH_REQUEST_FAIL, PRODUCT_SEARCH } from "../Redux/Constants";
import PriceSlider from "./PriceSlider";

function Filter({
  setShowFilter,
  showFilter,
  filterProducts,
  keyword,
  categoryTypes,
}) {
  const [value, setValue] = useState({ min: 1, max: 50000 });
  const [categories, setCategories] = useState([]);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(50000);

  console.log("------", categoryTypes);

  const data = [
    { label: "Basins", value: "basin" },
    { label: "Shower", value: "shower" },
    { label: "Flush", value: "flush" },
  ];

  const onChangeMax = num => {
    setValue({ ...value, max: num });
  };
  const onChangeMin = num => {
    setValue({ ...value, min: num });
  };

  const checkboxChange = (e, name) => {
    if (e.target.checked) {
      setCategories([...categories, name]);
    } else {
      const newCategories = categories.filter(item => item !== name);
      setCategories(newCategories);
    }
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
    const filterData = { ...value, categories, keyword };
    filterProducts(filterData);
  };

  return (
    <div
      style={showFilter ? fadein : fadeOut}
      className={`  border-2 bg-gray-100 border-gray-300  py-4 sm:px-12 px-6  rounded-md relative`}
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
        value={value}
        setValue={setValue}
        max={max}
        min={min}
        step={10}
        formatLabel={value => `Rs. ${value}`}
      />
      <div className="-mt-4 mb-8">
        <p className="text-2xl text-gray-600  text-center">Categories</p>
        <div className="grid  grid-cols-2 sm:gap-8 sm:grid-cols-5 mt-5">
          {categoryTypes.map(item => (
            <div className="flex items-center mb-6 sm:space-x-4 space-x-[6px]">
              <input
                className="w-6 h-6 "
                type="checkbox"
                value={item.value}
                onChange={e => checkboxChange(e, item.label)}
              />
              <p className="sm:text-xl text-md font-medium ">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        onClick={onFilter}
        className="border-2 border-gray-600 text-center py-[6px] my-4 text-gray-700 cursor-pointer hover:bg-gray-200 mx-auto text-xl font-medium rounded-md w-[200px]"
      >
        Apply Filter
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const categoryTypes = state.categories.productCategories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    categoryTypes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterProducts: async data => {
      try {
        const filteredData = await Axios.post(
          `/api/products/filteredProducts`,
          data
        );
        console.log("Filtered Data------------", filteredData);
        dispatch({
          type: PRODUCT_SEARCH,
          payload: filteredData.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
