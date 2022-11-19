import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

import {
  IoHomeOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import SellerHome from "./SellerHome";
import SellerProducts from "./SellerProducts";
import SellerStores from "./SellerStores";
import CreateStore from "./CreateStore";
import EditStore from "./EditStore";
import EditProduct from "./EditProduct";
import UploadProduct from "./UploadProduct";
import StoreDetail from "./StoreDetail";
import SellerOrders from "./SellerOrders";
import SellerSideBar from "../Components/SellerSideBar";

export default function SellerDashboard() {
  return (
    <div className="flex min-h-[calc(100vh-120px)] relative  bg-gray-50">
      <SellerSideBar/>
      <div className="sm:flex hidden flex-col sm:w-[250px] fixed h-full  border-r-2 border-gray-100  py-8">
        <h3 className="text-xl font-semibold my-4 text-center">
          Seller Dashboard
        </h3>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to="home"
        >
          <IoHomeOutline size={18} />
          <p>Home</p>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to="stores"
        >
          <IoStorefrontOutline size={18} />
          <p>Stores</p>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to="products"
        >
          <AiOutlineShopping size={18} />
          <p>Products</p>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to="createStore"
        >
          <AiOutlineShopping size={18} />
          <p>Create Store</p>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-4 px-8"
          to="orders"
        >
          <BsCart3 size={18} />
          <p>My Orders</p>
        </NavLink>
      </div>
      <div className="flex-1 ml-[54px] sm:ml-[250px]">
        <Routes>
          <Route path="/home" element={<SellerHome />} />
          <Route path="/products" element={<SellerProducts />} />
          <Route path="/stores" element={<SellerStores />} />
          <Route path="/stores/:storeId/*" element={<StoreDetail />} />
          <Route path="/createStore" element={<CreateStore />} />
          <Route path="/editStore/:storeId" element={<EditStore />} />
          <Route path="/orders" element={<SellerOrders />} />
          <Route
            path="/editStore/:storeId/uploadProduct"
            element={<UploadProduct />}
          />
          <Route
            path="/products/editProduct/:productId"
            element={<EditProduct />}
          />
          <Route
            path="/editStore/:storeId/editProduct/:productId"
            element={<EditProduct />}
          />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </div>
    </div>
  );
}
