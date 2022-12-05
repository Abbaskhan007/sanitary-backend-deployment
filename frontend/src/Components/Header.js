import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";

import Axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CART_DATA_REQUEST,
  EMPTY_CART,
  LOGOUT,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_SEARCH,
} from "../Redux/Constants";
import url from "../Constants";

function Header({
  cart,
  user,
  fetchUserCart,
  logout,
  searchHandler,
  store,
  products,
  setShow,
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name) {
      fetchUserCart(user._id);
    }
  }, [user, store, products]);

  console.log("Cart", cart);
  return (
    <div className="flex flex-row absolute top-0 w-full bg-violet-500 items-center justify-between p-3 px-6 z-30  ">
      <div>
        <img
          onClick={() => navigate("/")}
          className="h-10 w-10 cursor-pointer sm:inline-flex hidden"
          src="https://res.cloudinary.com/dlxyvl6sb/image/upload/v1665616632/sanitary-store/smart_sanitary-logos_transparent_elqtjb.png"
        />
        <div onClick={() => setShow(true)} className="cursor-pointer sm:hidden">
          <HiOutlineMenu color="#fff" size={26} />
        </div>
      </div>
      <div className="sm:flex hidden items-center justify-between ">
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderBottomColor: "#fff", borderBottomWidth: "4px" }
              : undefined
          }
          className="text-white font-semibold text-medium mr-12 cursor-pointer"
          to=""
        >
          Products
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderBottomColor: "#fff", borderBottomWidth: "4px" }
              : undefined
          }
          className="text-white font-semibold text-medium mr-12 cursor-pointer"
          to="/stores"
        >
          Stores
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? { borderBottomColor: "#fff", borderBottomWidth: "4px" }
              : undefined
          }
          className="text-white font-semibold text-medium mr-12 cursor-pointer "
          to="workers"
        >
          Workers
        </NavLink>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <Link to="cart">
            <BsCart className="text-white text-2xl cursor-pointer" />

            <p className="absolute flex justify-center items-center -top-2 -right-3 text-medium bg-white font-semibold text-pink-700 rounded-full w-[22px] h-[22px]">
              {cart?.length}
            </p>
          </Link>
        </div>
        {user.name ? (
          <div className="relative group transition ease-in-out-500 duration-500 h-full cursor-pointer sm:ml-4 min-w-[160px] -mr-4  ">
            <img
              src={user.profileImage}
              className="cursor-pointer h-10  w-10 rounded-full p-[3px] border border-white mx-auto"
            />
            <div className="absolute hidden hover:block rounded-md   group-hover:block  shadow-md bg-gray-50 min-w-48 w-full overflow-hidden z-10 text-center">
              <div className="  hover:bg-gray-200 h-8 flex-1  px-2 ">
                <Link to={`profile/${user._id}`}>Profile</Link>
              </div>
              {user.isSeller && (
                <div className="  hover:bg-gray-200 h-8 flex-1  px-2 border-gray-400 border-t ">
                  <Link to={`/sellerDashboard`}>Seller Dashboard</Link>
                </div>
              )}
              {user.isWorker && (
                <div className="  hover:bg-gray-200 h-8 flex-1  px-2 border-gray-400 border-t ">
                  <Link to={`/workerDashboard`}>Worker Dashboard</Link>
                </div>
              )}
              {user.isAdmin && (
                <div className="  hover:bg-gray-200 h-8 flex-1  px-2 border-gray-400 border-t ">
                  <Link to={`/adminDashboard`}>Admin Dashboard</Link>
                </div>
              )}
              <p
                className="px-2 border-gray-400 border-t h-8 hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <Link
            to="login"
            className="text-white  text-medium border border-white rounded-md py-1 px-4 ml-8"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
    products: state.productList,
    store: state.store,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserCart: async userId => {
      const { data } = await Axios.get(`${url}/cart/${userId}`);
      dispatch({
        type: CART_DATA_REQUEST,
        payload: data.products ? data.products : [],
      });
    },
    logout: () => {
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: EMPTY_CART,
      });
    },
    searchHandler: async keyword => {
      console.log("Keyword", keyword);
      try {
        const { data } = await Axios.post(`${url}/products/searchProduct`, {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
