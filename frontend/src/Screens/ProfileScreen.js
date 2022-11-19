import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";

import {
  IoPersonOutline,
  IoSettingsOutline,
  IoChatboxOutline,
} from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";

import UserInfoScreen from "./UserInfoScreen";
import Settings from "./Settings";
import UserOrdersScreen from "./UserOrdersScreen";
import UserReviewsScreen from "./UserReviewsScreen";
import { EMPTY_CART, LOGOUT } from "../Redux/Constants";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import ProfileSidebar from "../Components/ProfileSidebar";

function ProfileScreen({ user, logout }) {
  console.log("User", user);
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    logout();
    localStorage.removeItem("user");
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] relative  bg-gray-50">
      <ProfileSidebar />
      <div className="sm:flex hidden flex-col w-[250px] fixed h-full  border-r-2 border-gray-100  py-8">
        <h3 className="text-xl font-semibold my-4 text-center">User Profile</h3>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to="userInfo"
        >
          <IoPersonOutline size={18} />
          <p>User Info</p>
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
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to={`reviews?user=${user._id}`}
        >
          <IoChatboxOutline size={18} />
          <p>My reviews</p>
        </NavLink>

        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderRightColor: "#8b62f3", borderRightWidth: "4px" }
              : undefined
          }
          className="text-gray-400 text-medium my-3 flex items-center space-x-3 px-8"
          to="setting"
        >
          <IoSettingsOutline size={18} />
          <p>Settings</p>
        </NavLink>
        <div
          onClick={onLogout}
          className="text-medium my-3 cursor-pointer font-medium flex items-center space-x-3 px-8 mt-auto mb-28  text-red-500 "
        >
          <AiOutlineLogout size={22} />
          <p>Logout</p>
        </div>
      </div>
      <div className="flex-1 ml-[54px] sm:ml-[250px]">
        <Routes>
          <Route path="userInfo" element={<UserInfoScreen />} />
          <Route path="reviews" element={<UserReviewsScreen />} />
          <Route path="orders" element={<UserOrdersScreen />} />
          <Route path="setting" element={<Settings />} />
          <Route path="*" element={<Navigate to="userInfo" replace />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: EMPTY_CART,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
