import React, { useState } from "react";
import { IoArrowBackSharp, IoArrowForward } from "react-icons/io5";
import { IoHomeOutline, IoStorefrontOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function SellerSideBar() {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={`fixed sm:hidden top-0 bottom-0 pt-16 flex flex-col justify-between  ${
        expand ? "w-[200px] z-40" : "w-[54px] z-20 "
      } left-0 h-full bg-violet-500 flex flex-col    px-2`}
    >
      <div>
        {expand ? (
          <div
            className=" flex justify-end mt-2 mb-16 mr-2 "
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
          className={`text-white  my-3 flex items-center p-2 ${
            !expand && "justify-center px-2"
          } rounded-md cursor-pointer  ${expand && "w-full space-x-3"}  `}
          to="home"
        >
          <IoHomeOutline size={20} color="#fff" />
          {expand && <p>Home</p>}
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white my-3 flex items-center p-2 ${
            !expand && "justify-center px-2"
          } rounded-md cursor-pointer ${expand && "w-full space-x-3"}  `}
          to="stores"
        >
          <IoStorefrontOutline size={20} color="#fff" />
          {expand && <p>Stores</p>}
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white  my-3 flex items-center p-2 ${
            !expand && "justify-center px-2"
          } rounded-md cursor-pointer ${expand && "w-full space-x-3"}  `}
          to={`products`}
        >
          <AiOutlineShopping size={20} color="#fff" />
          {expand && <p>Products</p>}
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#6d28d9" } : undefined
          }
          className={`text-white  my-3 flex items-center p-2 ${
            !expand && "justify-center px-2"
          } rounded-md cursor-pointer ${expand && "w-full space-x-3"}  `}
          to="createStore"
        >
          <AiOutlineShopping size={20} color="#fff" />
          {expand && <p>Create Store</p>}
        </NavLink>
      </div>
    </div>
  );
}
