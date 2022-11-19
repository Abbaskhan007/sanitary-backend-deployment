import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import {
  GET_CATEGORIES,
  GET_WORKERS_CATEGORIES,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
  PRODUCT_SEARCH,
} from "../Redux/Constants";
import Loading from "../Components/Loading";
import ErrorBox from "../Components/ErrorBox";
import ProductCard from "../Components/ProductCard";
import PriceSlider from "../Components/PriceSlider";
import Filter from "../Components/Filter";
import { IoSearch } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import ImageSearch from "./ImageSearch";
import Banner from "../Components/Banner";
import CategoriesSection from "../Components/CategoriesSection";

function HomeScreen({
  fetchProducts,
  productList,
  searchHandler,
  getCategories,
  getWorkerCategories,
  productCategories,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(false);

  useEffect(() => {
    fetchProducts();
    getCategories();
    getWorkerCategories();
  }, []);

  const onSearch = value => {
    searchHandler(value);
    setKeyword(value);
  };

  return productList.Loading ? (
    <Loading />
  ) : productList.error ? (
    <ErrorBox />
  ) : (
    <div className=" min-h-[calc(100vh-100px)] pb-24">
      <Banner />
      <div className="p-2  px-6 sm:px-12">
        <div className="flex  items-center  lg:space-x-12 md:space-x-8 space-x-4 ">
          <div className="flex flex-1 items-center bg-white  p-2 px-3 rounded-md  border-2 border-gray-300 ">
            <IoSearch className="text-gray-500 mr-2" size={22} />
            <input
              className="border-0  outline-0 bg-transparent text-medium flex-1"
              type="text"
              placeholder="Search product"
              onChange={e => onSearch(e.target.value)}
            />
            <ImageSearch />
          </div>

          <div
            onClick={() => setShowFilter(!showFilter)}
            className="flex cursor-pointer sm:space-x-2  items-center border-2 border-gray-400 p-[6px] px-3 rounded-md"
          >
            <p className="text-xl font-medium text-gray-600 hidden sm:inline-flex">
              Filter
            </p>
            <FiFilter size={24} />
          </div>
        </div>

        {/* {showFilter && (
        <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      )} */}
        <Filter
          keyword={keyword}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
        <h2 className="text-center text-4xl mb-10 mt-4 border-b-[2px] border-gray-300 pb-2 max-w-[450px] font-light mx-auto">
          Categories
        </h2>
        <CategoriesSection />

        <h2 className="text-center text-4xl mb-12 mt-20 border-b-[2px] border-gray-300 pb-2 max-w-[450px] font-light mx-auto">
          Top Rated Products
        </h2>
        {productList.products.length > 0 ? (
          <div className="grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 space-y-6 sm:space-y-0 sm:gap-8  bg-[#ffffff]">
            {productList.products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex -mt-12 h-full items-center justify-center">
            <p className="text-red-400 text-xl font-semibold">
              No Products Present
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state", state);
  return {
    productList: state.productList,
    productCategories: state.categories.productCategories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async () => {
      //const data = axios.get("/");
      dispatch({ type: PRODUCT_FETCH_REQUEST });
      try {
        const { data } = await Axios.get("/api/products/getProducts");
        console.log(data);
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
    searchHandler: async keyword => {
      console.log("Keyword", keyword);
      try {
        const { data } = await Axios.post("/api/products/searchProduct", {
          keyword,
        });
        dispatch({
          type: PRODUCT_SEARCH,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
    getCategories: async () => {
      console.log("Categories*****************___________________________!!!");
      try {
        const { data } = await Axios.get(`/api/categories`);
        dispatch({
          type: GET_CATEGORIES,
          payload: data,
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
    getWorkerCategories: async () => {
      console.log("Categories*****************___________________________!!!");
      try {
        const { data } = await Axios.get(`/api/workerCategories`);
        console.log("Worker Categories________", data);
        dispatch({
          type: GET_WORKERS_CATEGORIES,
          payload: data,
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
