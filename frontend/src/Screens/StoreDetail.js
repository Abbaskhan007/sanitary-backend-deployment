import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  Link,
  NavLink,
  useParams,
  Navigate,
} from "react-router-dom";

import StoreDescriptionScreen from "./StoreDescriptionScreen";
import StoreProductsScreen from "./StoreProductsScreen";
import Axios from "axios";
import { connect } from "react-redux";

function StoreDetail({ seller }) {
  const [storeData, setStoreData] = useState({});
  const { storeId } = useParams();
  const getStoreData = async () => {
    const { data } = await Axios.get(`/api/stores/getStore/${storeId}`);
    console.log(
      "Store Data",
      storeData,
      seller === storeData?.seller?._id,
      seller,
      storeData?.seller?._id
    );
    setStoreData(data);
  };
  useEffect(() => {
    getStoreData();
  }, []);
  return (
    <div>
      <img className="w-full object-fill h-[500px]" src={storeData.image} />
      <div className="sm:p-12 p-6 text-center relative">
        {seller === storeData?.seller?._id && (
          <NavLink
            className="absolute top-2 right-4 bg-blue-500 text-white px-4 py-[6px] rounded-md text-sm font-medium"
            to={`/storeAnalytics/${storeData._id}`}
          >
            View Analytics
          </NavLink>
        )}
        {seller === storeData?.seller?._id && <div className="mb-12"/>}
        <span className="my-4 text-3xl font-medium text-center border-2 border-gray-400 p-2 px-4 text-gray-600">
          {storeData.name}
        </span>
        <p className="mb-8"></p>

        <div className="flex mb-12 space-x-12 items-center justify-center">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? { borderBottomColor: "#604df0", borderBottomWidth: "4px" }
                : undefined
            }
            className="text-lg font-medium active:text-red-300"
            to="products"
          >
            Products
          </NavLink>
          <NavLink
            style={({ isActive }) =>
              isActive
                ? { borderBottomColor: "#604df0", borderBottomWidth: "4px" }
                : undefined
            }
            className="text-lg font-medium active:text-red-300"
            to="details"
          >
            Detail
          </NavLink>
        </div>

        <Routes>
          <Route
            path="products"
            element={<StoreProductsScreen products={storeData.products} />}
          />
          <Route
            path="details"
            element={<StoreDescriptionScreen description={storeData} />}
          />
          <Route path="*" element={<Navigate to="products" replace />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("--------", state);
  return {
    seller: state.seller._id,
  };
};

export default connect(mapStateToProps, null)(StoreDetail);
