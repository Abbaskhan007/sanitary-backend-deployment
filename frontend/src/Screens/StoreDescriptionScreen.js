import React, { useState, useEffect } from "react";
import RatingStars from "../Components/RatingStars";
import moment from "moment";
import Axios from "axios";
import ReviewBox from "../Components/ReviewBox";

export default function StoreDescriptionScreen({ description, user }) {
  console.log("Description", description);
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    const { data } = await Axios.post("/api/orders/getReviews", {
      storeId: description._id,
    });
    console.log("data of reviews", data);
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div>
      <div className="text-xl  font-medium my-1 sm:flex justify-center">
        Categories:{" "}
        <div className="flex flex-row mt-3 sm:mt-0 flex-wrap">
        {description?.category?.map(ctg => (
          <p className="text-sm bg-gray-200 ml-4 py-2 px-4 text-gray-500 font-semibold rounded-md ">{ctg}</p>
        ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-4  grid-cols-2 sm sm:gap-12 gap-4 my-6">
        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-lg items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Rating</p>
          <div className="flex items-center space-x-2">
            <RatingStars rating={description.rating} />
            <span className="text-sm text-gray-400">
              ({description.rating})
            </span>
          </div>
        </div>

        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Orders Delivered</p>
          <p className="text-3xl font-light">{description.orderDelivered}</p>
        </div>

        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Orders Cancelled</p>
          <p className="text-3xl font-light">{description.orderCancelled}</p>
        </div>

        <div className="shadow-lg border-2 border-gray-100 flex py-4 rounded-md items-center justify-center flex-col">
          <p className="text-xl font-semibold mb-2">Joined</p>
          <p className="text-2xl font-light">
            {moment(description.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <p>{description.description}</p>
      <div className="my-6">
        <p className="text-2xl text-light border-b-2 border-gray-300 pb-1 mb-3 w-44">
          About the seller
        </p>
        <div className="flex items-center space-x-2 ">
          <img
            className="w-16 h-16 p-1 border-2 border-gray-300 rounded-full"
            src={description.seller?.user?.profileImage}
          />
          <p className="text-lg font-medium">
            {description.seller?.user?.name}
          </p>
          <p className="text-sm text-gray-400">({description.seller.rating})</p>
        </div>
        <p className="my-2 text-left ml-8">{description.seller.description}</p>
      </div>
      <div className=" text-left">
        <p className="text-lg text-center underline underline-offset-4 my-4">
          Ratings and Reviews
        </p>
        <div>
          {reviews.map(review => (
            <ReviewBox review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
