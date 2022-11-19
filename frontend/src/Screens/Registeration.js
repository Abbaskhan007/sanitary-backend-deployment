import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ErrorBox from "../Components/ErrorBox";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REGISTERATION_REQUEST,
  REGISTERATION_REQUEST_FAIL,
  REGISTERATION_REQUEST_SUCCESS,
} from "../Redux/Constants";
import Loading from "../Components/Loading";

function Registeration({ registerAction, user, cart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(user.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user.name) {
      navigate("/");
    }
  }, [user]);

  const submitHandler = async e => {
    setError(null);
    e.preventDefault();
    if (password.length < 6) {
      setError("Password should be atleast 6 character");
      return;
    } else if (password !== confirmPassword) {
      setError("Password is not equal to confirm password");
      return;
    } else {
      registerAction(
        { name: name, email: email, password, confirmPassword },
        cart
      );
    }
  };
  return user.loading ? (
    <Loading />
  ) : (
    <div
      className={`flex flex-1 flex-col items-center justify-center  h-[calc(100vh-120px)] `}
    >
      <form
        onSubmit={submitHandler}
        className="w-[80%] lg:w-[30%] md:w-[40%] sm:w-[50%]"
      >
        <p className="text-4xl font-semibold mb-6 text-center">Registeration</p>
        <div className="flex flex-col mb-6">
          <label className="text-sm font-bold mb-2">Full Name</label>
          <input
            className="border border-gray-400 p-1 rounded-lg px-3 flex-1 outline-violet-500"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-sm font-bold mb-2">Email Address</label>
          <input
            className="border border-gray-400 p-1 rounded-lg px-3 flex-1 outline-violet-500"
            type="Email"
            placeholder="Enter your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-sm font-bold mb-2">Password</label>
          <input
            className="border border-gray-400 p-1 rounded-lg px-3 flex-1 outline-violet-500"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-6">
          <label className="text-sm font-bold mb-2">Password</label>
          <input
            className="border border-gray-400 p-1 rounded-lg px-3 flex-1 outline-violet-500"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 w-full p-2 text-white rounded-md my-4"
        >
          Log In
        </button>
        {error || user.error ? (
          <ErrorBox message={user.error ? user.error : error} variant="fail" />
        ) : null}
      </form>

      <p className="text-sm font-bold">
        Already have account?{" "}
        <Link to="/login" className="text-violet-700">
          Click to Login
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("State", state);
  return {
    user: state.user,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerAction: async (userData, cart) => {
      console.log("user data action", userData);
      dispatch({
        type: REGISTERATION_REQUEST,
      });
      try {
        const { data } = await Axios.post("/api/users/registeration", userData);
        console.log("Data----", data);
        if (data.message) {
          dispatch({
            type: REGISTERATION_REQUEST_FAIL,
            payload: data.message,
          });
        } else if (data.user) {
          dispatch({
            type: REGISTERATION_REQUEST_SUCCESS,
            payload: data.user,
          });

          localStorage.setItem("user", JSON.stringify(data.user))

          //Pushing all local storage cart items in to the database


          localStorage.removeItem("cart");
          dispatch({ type: EMPTY_CART });

    
          await cart.forEach(async (item) => {
            console.log("Item", item);
            const cartData = await Axios.post("/api/cart/addToCart", {
              user: data.user._id,
              products: {
                product: item.product._id,
                quantity: item.quantity,
              },
            });
            console.log("Data", data);
            dispatch({ type: ADD_TO_CART, payload: cartData.data.products });
          });

         
        }
      } catch (err) {
        dispatch({
          type: REGISTERATION_REQUEST_FAIL,
          payload: err?.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registeration);
