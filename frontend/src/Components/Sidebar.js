import React from "react";
import { IoIosClose } from "react-icons/io";
import { BsPerson, BsShop } from "react-icons/bs";
import { IoHomeOutline, IoHammerOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { EMPTY_CART, LOGOUT } from "../Redux/Constants";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Sidebar({ setShow, user, logout }) {
  const navigate = useNavigate();
  console.log("User: ", user, "Logout: ", logout);
  const onLogout = () => {
    try {
      setShow(false);
      navigate("/");
      logout();
      localStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full sm:hidden  h-full flex fixed top-0 left-0 z-40 bg-black/50">
      <div className="bg-violet-500 flex sm:flex-row  flex-col justify-between h-full w-[275px] relative p-4">
        <IoIosClose
          className="absolute right-1 top-1 cursor-pointer"
          color="#fff"
          size={30}
          onClick={() => setShow(false)}
        />
        <div>
          <div className="flex flex-col   ">
            <img
              className="w-32 h-32 mx-auto object-contain"
              src="https://res.cloudinary.com/dlxyvl6sb/image/upload/v1665616632/sanitary-store/smart_sanitary-logos_transparent_elqtjb.png"
            />
          </div>
          <NavLink
            onClick={() => setShow(false)}
            style={({ isActive }) =>
              isActive
                ? {
                    borderRightColor: "#fff",
                    borderRightWidth: "4px",
                    backgroundColor: "#7c3aed",
                    margin: "8px 0px",
                  }
                : undefined
            }
            className="flex items-center text-white font-semibold text-medium mr-12 cursor-pointer py-2 w-full rounded-md px-4"
            to=""
          >
            <IoHomeOutline color="#fff" size={20} className="mr-3" />
            Products
          </NavLink>
          <NavLink
            onClick={() => setShow(false)}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottomColor: "#fff",
                    borderRightWidth: "4px",
                    backgroundColor: "#7c3aed",
                    margin: "8px 0px",
                  }
                : undefined
            }
            className="flex items-center text-white font-semibold text-medium mr-12 cursor-pointer py-2 w-full rounded-md px-4"
            to="/stores"
          >
            <BsShop color="#fff" size={20} className="mr-3" />
            Stores
          </NavLink>
          <NavLink
            onClick={() => setShow(false)}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottomColor: "#fff",
                    borderRightWidth: "4px",
                    backgroundColor: "#7c3aed",
                    margin: "8px 0px",
                  }
                : undefined
            }
            className="flex items-center text-white font-semibold text-medium mr-12 cursor-pointer py-2 w-full rounded-md px-4"
            to="Workers"
          >
            <IoHammerOutline color="#fff" size={20} className="mr-3" />
            Workers
          </NavLink>
        </div>
        {user ? (
          <div
            onClick={onLogout}
            className=" flex items-center text-white font-semibold text-medium mr-12 cursor-pointer py-2 w-full rounded-md px-4  "
          >
            <AiOutlineLogout color="#fff" size={20} className="mr-3" />
            <p>Logout</p>
          </div>
        ) : (
          <NavLink
            onClick={() => setShow(false)}
            style={({ isActive }) =>
              isActive
                ? {
                    borderBottomColor: "#fff",
                    borderRightWidth: "4px",
                    backgroundColor: "#7c3aed",
                    margin: "8px 0px",
                  }
                : undefined
            }
            className="flex items-center text-white font-semibold text-medium mr-12 cursor-pointer py-2 w-full rounded-md px-4"
            to="login"
          >
            <BsPerson color="#fff" size={20} className="mr-3" />
            Login
          </NavLink>
        )}
      </div>
      <div onClick={() => setShow(false)} className="w-full flex-1  "></div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("-----state", state);
  return {
    user: state.user.user._id,
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
