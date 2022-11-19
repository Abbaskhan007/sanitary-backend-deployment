import React, { useState } from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import {
  AiFillCheckCircle,
  AiFillHome,
  AiOutlineCheck,
  AiOutlineCheckCircle,
} from "react-icons/ai";

export default function TrackOrder({ status }) {
  console.log("Status____", status);
  let num;
  if (status === "Pending") {
    num = 1;
  } else if (status === "Shipped") {
    num = 2;
  } else if (status === "EnRoute") {
    num = 3;
  } else if (status === "Delivered") {
    num = 4;
  }

  return (
    <div className="mt-6 font-medium shadow-lg shadow-gray-200 border-2 border-gray-100 p-4 rounded-lg">
      <p>Track Order</p>
      <div className="flex items-center justify-between my-4 bg-red-200">
        <div
          className={`flex-1 border-t-4 ${
            num > 1 ? "border-t-violet-500" : "border-t-violet-200"
          }   relative`}
        >
          <div className="w-6 h-6 rounded-full bg-violet-500 absolute -top-[15px] flex justify-center items-center">
            {num >= 1 && <AiOutlineCheckCircle size={16} color="#fff" />}
          </div>
        </div>
        <div
          className={`flex-1 border-t-4   ${
            num > 2 ? "border-t-violet-500" : "border-t-violet-200"
          } relative`}
        >
          <div className="w-6 h-6 rounded-full bg-violet-500 absolute -top-[15px] flex justify-center items-center">
            {num >= 2 && <AiOutlineCheckCircle size={16} color="#fff" />}
          </div>
        </div>
        <div
          className={`flex-1 border-t-4  ${
            num > 3 ? "border-t-violet-500" : "border-t-violet-200"
          } relative`}
        >
          <div className="w-6 h-6 rounded-full bg-violet-500 absolute -top-[15px] flex justify-center items-center">
            {num >= 3 && <AiOutlineCheckCircle size={16} color="#fff" />}
          </div>
        </div>
        <div
          className={` border-t-4 ${
            num > 4 ? "border-t-violet-500" : "border-t-violet-200"
          } relative`}
        >
          <div className="w-6 h-6 rounded-full bg-violet-500 absolute -top-[15px] -right-2 flex justify-center items-center">
            {num >= 4 && <AiOutlineCheckCircle size={16} color="#fff" />}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mt-6">
        <div className="flex flex-row items-center ">
          <IoNewspaperSharp size={18} />
          <p className="leading-none text-[10px]  font-semibold ml-2">
            Order <br /> Proceeded{" "}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <FaBoxOpen size={18} />
          <p className="leading-none text-[10px]  font-semibold ml-2">
            Order <br /> Shipped{" "}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <TbTruckDelivery size={18} />
          <p className="leading-none text-[10px]  font-semibold ml-2">
            Order <br /> En Route{" "}
          </p>
        </div>
        <div className="flex flex-row items-center ">
          <AiFillHome size={18} />
          <p className="leading-none text-[10px]  font-semibold ml-2">
            Order <br /> Arrived{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
