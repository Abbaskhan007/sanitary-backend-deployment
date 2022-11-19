import React, { useState } from "react";
import { BsCart3, BsChatSquareQuote, BsShop } from "react-icons/bs";
import {
  IoChatboxOutline,
  IoChevronDownSharp,
  IoChevronForwardSharp,
  IoConstructOutline,
} from "react-icons/io5";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import AdminSideBar from "../Components/AdminSideBar";
import Login from "./Login";
import SellerRequests from "./SellerRequests";
import UserOrdersScreen from "./UserOrdersScreen";
import WorkerRequests from "./WorkerRequests";

export default function AdminDashboard() {
  const [requestOpen, setRequestOpen] = useState(true);
  console.log("Request Open", requestOpen);
  return (
    <div className="flex  overflow-x-hidden ">
      <AdminSideBar />
      <div className="border-r-2 sm:block hidden border-gray-100 w-[250px]  pt-24 fixed top-0 bottom-0  min-h-[calc(100vh-120px)] overflow-y-scroll">
        <h1 className="text-xl font-medium text-center mb-4">Dashboard</h1>
        <div className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8 "></div>
        <div className="flex items-center justify-between my-3 px-8 text-gray-400 ">
          <div
            onClick={() => setRequestOpen(!requestOpen)}
            className="flex flex-1 items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <BsChatSquareQuote size={18} />
              <p>Requests</p>
            </div>
            {requestOpen ? (
              <IoChevronDownSharp />
            ) : (
              <IoChevronForwardSharp size={18} />
            )}
          </div>
        </div>
        {requestOpen && (
          <>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
                  : undefined
              }
              className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8 pl-10"
              to="workerRequests"
            >
              <IoConstructOutline size={18} />
              <p>Worker Requests</p>
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
                  : undefined
              }
              className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8 pl-10"
              to="sellerRequests"
            >
              <BsShop size={18} />
              <p>Seller Requests</p>
            </NavLink>
          </>
        )}
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
      <div className="sm:ml-[250px] flex-1 ml-[52px] p-4 ">
        <Routes>
          <Route path="workerRequests" element={<WorkerRequests />} />
          <Route path="sellerRequests" element={<SellerRequests />} />
          <Route path="orders" element={<UserOrdersScreen admin={true} />} />
          <Route path="*" element={<Navigate to="workerRequests" replace />} />
        </Routes>
      </div>
    </div>
  );
}
