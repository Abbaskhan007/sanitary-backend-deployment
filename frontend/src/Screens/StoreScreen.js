import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { connect } from "react-redux";
import ErrorBox from "../Components/ErrorBox";
import Loading from "../Components/Loading";
import StoreCard from "../Components/StoreCard";
import Select from "react-select";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";

function StoreScreen({ fetchStoreData, store, filterStore, categoryTypes }) {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");

  const onSearch = value => {
    setSearch(value);
    filterStore({ search: value, categories: category });
  };

  const onCategoryChange = e => {
    const categories = e.map(item => item.value);
    setCategory(categories);
    filterStore({ categories, search });
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  console.log("Category........", category);

  if (store.loading) return <Loading />;
  else if (store.error)
    return <ErrorBox variant="fail" message={store.error} />;
  else {
    return (
      <div className="sm:p-12 py-8 px-6  min-h-[calc(100vh-100px)]">
        <div className="flex sm:flex-row flex-col items-center sm:space-x-12 sm:space-y-0 space-y-6 mb-12 ">
          <div className="flex flex-1 w-full items-center bg-white  p-[7px] px-3 rounded-md  border border-gray-300 ">
            <IoSearch className="text-gray-500 mr-2" size={22} />
            <input
              className="border-0   outline-0 bg-transparent text-medium flex-1"
              type="text"
              placeholder="Search store"
              onChange={e => onSearch(e.target.value)}
            />
          </div>
          <Select
            name="categories"
            options={categoryTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select categories"
            onChange={onCategoryChange}
            isMulti={true}
            className="sm:w-fit w-full"
          />
        </div>
        {store?.data?.length > 0 ? (
          <div className="grid lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2   gap-8">
            {store.data?.map(item => (
              <StoreCard store={item} />
            ))}
          </div>
        ) : (
          <div className="flex -mt-12 h-full items-center justify-center">
            <p className="text-red-400 text-xl font-semibold">
              No Store Present
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const categoryTypes = state.categories.productCategories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    store: state.store,
    categoryTypes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStoreData: async () => {
      dispatch({ type: STORE_FETCH_REQUEST });

      try {
        const { data } = await axios.get("api/stores/getStores");
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({ type: STORE_FETCH_FAILURE, payload: err.message });
      }
    },
    filterStore: async filterData => {
      console.log("********** Filtered Data", filterData);
      const { data } = await axios.post("api/stores/filterStore", filterData);
      console.log("Data of stores -----", data);
      dispatch({
        type: STORE_FETCH_SUCCESS,
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);

