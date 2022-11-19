import React, { useState } from "react";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoChatboxOutline,
  IoArrowBackSharp,
  IoArrowForward,
} from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { EMPTY_CART, LOGOUT } from "../Redux/Constants";
import { connect } from "react-redux";

function ProfileSidebar({ user, logout }) {
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    logout();
    localStorage.removeItem("user");
  };
  return (
    <div
      className={`fixed sm:hidden top-0 bottom-0 pt-16 flex flex-col justify-between  ${
        expand ? "w-[200px] z-40" : "w-[54px] z-20 "
      } left-0 h-full bg-violet-500 flex flex-col    px-2`}
    >
      <div>
        {expand ? (
          <div
            className=" flex justify-end  mt-2 mr-2 mb-16 "
            onClick={() => setExpand(false)}
          >
            <IoArrowBackSharp color="#fff" size={20} />
          </div>
        ) : (
          <div
            className="mb-16 flex justify-center    mt-2"
            onClick={() => setExpand(true)}
          >
            <IoArrowForward color="#fff" size={20} />
          </div>
        )}
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white  my-3 flex items-center p-2  ${!expand && "justify-center px-2"} rounded-md cursor-pointer  ${
            expand && "w-full space-x-3"
          }  `}
          to="userInfo"
        >
          <IoPersonOutline size={20} color="#fff" />
          {expand && <p>User Info</p>}
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white my-3 flex items-center p-2  ${!expand && "justify-center px-2"} rounded-md cursor-pointer ${
            expand && "w-full space-x-3"
          }  `}
          to="orders"
        >
          <BsCart3 size={20} color="#fff" />
          {expand && <p>My Orders</p>}
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white  my-3 flex items-center p-2  ${!expand && "justify-center px-2"} rounded-md cursor-pointer ${
            expand && "w-full space-x-3"
          }  `}
          to={`reviews?user=${user._id}`}
        >
          <IoChatboxOutline size={20} color="#fff" />
          {expand && <p>My Reviews</p>}
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white  my-3 flex items-center p-2 ${!expand && "justify-center px-2"} rounded-md cursor-pointer ${
            expand && "w-full space-x-3"
          }  `}
          to="setting"
        >
          <IoSettingsOutline size={20} color="#fff" />
          {expand && <p>Settings</p>}
        </NavLink>
      </div>
      <div
        onClick={onLogout}
        className={`text-white my-3 flex items-center p-2 px-2 rounded-md cursor-pointer ${
          expand && "w-full space-x-3"
        }  `}
      >
        <AiOutlineLogout size={20} color="#fff" />

        {expand && <p>Logout</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebar);
