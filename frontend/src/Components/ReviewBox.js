import React, { useState } from "react";
import RatingStars from "./RatingStars";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ViewOrderScreen from "../Screens/ViewOrderScreen";

export default function ReviewBox({ review }) {
  console.log("Review)))))", review);
  const [model, setModel] = useState(false);
  const navigation = useNavigate();
  return (
    <div className="sm:w-[500px] mb-6 mx-auto shadow-lg bg-white border-2 border-gray-100 p-4 rounded-lg">
      {model && <ViewOrderScreen setModel={setModel} orderId={review._id} />}
      <div className="flex flex-row items-center ">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={review.customerId.profileImage}
        />
        <p className="text-sm font-medium flex-1">{review.customerId.name}</p>
        <div className="flex flex-row items-center space-x-1">
          <RatingStars rating={review.rating} />
          <p className="text-gray-400 text-sm font-normal">({review.rating})</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 font-medium ml-12 my-1">
        {review.review}
      </p>
      <div className="flex flex-row items-center justify-between mt-4">
        <p className="text-sm text-gray-400">
          {moment(review.createdAt).format("YYYY-MM-DD")}
        </p>
        <p
          className="font-medium text-sm text-gray-400 underline cursor-pointer"
          onClick={() => setModel(true)}
        >
          View Order
        </p>
      </div>
    </div>
  );
}
