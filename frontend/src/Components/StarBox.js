import React from "react";
import { IoStarSharp } from "react-icons/io5";

export default function StarBox({ setRatings, rating }) {
  console.log("Rating", rating);
  const activeStyle = "scale-[1.35]  ease-in-out-300 duration:300 bg-gray-400 border-gray-400";
  return (
    <div className="flex flex-row items-center justify-between space-x-4">
      <div
        onClick={() => setRatings(1)}
        className={`flex items-center justify-center  border flex-1 bg-gray-200 shadow-md p-2 rounded-md ${
          rating === 1 ? `${activeStyle} bg-gray-300 mx-4` : "bg-gray-200 "
        }`}
      >
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
      </div>
      <div
        onClick={() => setRatings(2)}
        className={`flex items-center justify-center  border flex-1 shadow-md p-2 rounded-md ${
          rating === 2 ? `${activeStyle} bg-gray-300 mx-4` : "bg-gray-200 "
        }`}
      >
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
      </div>
      <div
        onClick={() => setRatings(3)}
        className={`flex items-center justify-center  border flex-1 bg-gray-200 shadow-md p-2 rounded-md ${
          rating === 3 ? `${activeStyle} bg-gray-300 mx-4` : "bg-gray-200 "
        }`}
      >
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
      </div>{" "}
      <div
        onClick={() => setRatings(4)}
        className={`flex items-center justify-center  border flex-1 bg-gray-200 shadow-md p-2 rounded-md ${
          rating === 4 ? `${activeStyle} bg-gray-300 mx-4` : "bg-gray-200 "
        }`}
      >
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />{" "}
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
      </div>{" "}
      <div
        onClick={() => setRatings(5)}
        className={`flex items-center justify-center  border flex-1 bg-gray-200 shadow-md p-2 rounded-md ${
          rating === 5 ? `${activeStyle} bg-gray-300 mx-4` : "bg-gray-200 "
        }`}
      >
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
        <IoStarSharp size={14} className="text-violet-500 text-lg" />{" "}
        <IoStarSharp size={14} className="text-violet-500 text-lg" />{" "}
        <IoStarSharp size={14} className="text-violet-500 text-lg" />
      </div>
    </div>
  );
}
