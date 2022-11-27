import Axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloseOutline, IoStarOutline, IoStarSharp } from "react-icons/io5";
import Loading from "../Components/Loading";
import RatingStars from "../Components/RatingStars";
import Slider from "../Components/Slider";
import StarBox from "../Components/StarBox";
import TrackOrder from "../Components/TrackOrder";

export default function ViewOrderScreen({
  setModel,
  orderId,
  sellerView = false,
}) {
  const [orderData, setorderData] = useState({});
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(1);
  const fetchOrder = async () => {
    setLoading(true);
    const { data } = await Axios.get(`/api/orders/getOrder/${orderId}`);
    console.log("Data", data);
    setorderData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  //something
  console.log("Stars", stars);
  const onSubmit = async () => {
    const { data } = await Axios.put(`/api/orders/rate`, {
      review,
      rating: stars,
      orderId: orderData._id,
    });
    setorderData(data);
    console.log("Data___", data);
  };

  const onClose = () => {
    setModel(false);
  };

  return (
    <div className="bg-black/50 fixed inset-0 -bottom-3  align-middle flex items-center justify-center z-50">
      <div className="bg-white sm:w-[500px] w-[90%] relative opacity-100 sm:p-6 p-3 py-8 shadow-lg rounded-md flex-col overflow-y-scroll max-h-[calc(100vh-160px)]">
        <IoCloseOutline
          onClick={onClose}
          size={24}
          className="absolute  cursor-pointer right-2 top-2 z-10 bg-black/30 font-bold text-white text-2xl rounded-full p-[3px]"
        />
        {loading || !orderData._id ? (
          <Loading />
        ) : (
          <div>
            <Slider images={orderData.productId.images} />
            <div className="flex flex-row items-center space-x-2 mb-4 mt-8">
              <p className="font-medium">Name: </p>
              <p className="">{orderData?.productId?.name}</p>
            </div>

            <div className="flex flex-row items-center space-x-2 mb-4">
              <p className="font-medium">Quantity: </p>
              <p>{orderData?.quantity}</p>
            </div>
            <div className="flex flex-row items-center  mb-4">
              <p className="font-medium mr-3 w-12">User: </p>
              <img
                className="w-8 h-8 rounded-full mr-1"
                src={orderData.customerId.profileImage}
              />
              <p className="text-sm font-medium">{orderData.customerId.name}</p>
            </div>
            <div className="flex flex-row items-center  mb-4">
              <p className="font-medium mr-3 w-12">Store: </p>
              <img
                className="w-8 h-8 rounded-full mr-1"
                src={orderData.productId.store.image}
              />
              <p className="text-sm font-medium">
                {orderData.productId.store.name}
              </p>
            </div>

            <div className="flex flex-row  space-x-2 mb-4">
              <p className="font-medium">Delivery Address: </p>
              <p>
                {`${orderData?.shippingAddress.address}, 
              ${orderData?.shippingAddress.area}, 
              ${orderData?.shippingAddress.city}, 
              ${orderData?.shippingAddress.province} `}
              </p>
            </div>
            <div className="flex flex-row  space-x-2 jus mb-4">
              <p className="font-medium">Payment Method: </p>
              <p>{orderData?.paymentMethod}</p>
            </div>
            <div className="flex flex-row  space-x-2 items-center mb-4">
              <p className="font-medium">Delivery Status: </p>
              <p
                className={`py-[6px] px-[10px] font-medium rounded-md ${
                  orderData.status === "Cancelled"
                    ? "bg-red-200 text-red-600"
                    : orderData.status === "Delivered"
                    ? "bg-green-200 text-green-600"
                    : "bg-orange-200 text-orange-600"
                }`}
              >
                {orderData.status}
              </p>
            </div>
            <div className="flex flex-row  space-x-2 items-center mb-4">
              <p className="font-medium">Total: </p>
              <p>
                {orderData.paymentMethod === "bank" ? "Rs. " : "Eth. "} $
                {orderData?.amount}
              </p>
            </div>
            {console.log("==========", orderData)}
            {orderData?.rating ? (
              <div>
                <p className="font-medium">My Rating: </p>
                {/* <StarRa rating={orderData?.rating} /> */}
                <div className="m-auto my-2 bg-gray-100 w-28 shadow-md p-2 px-4 rounded-md">
                  <p className="text-center font-medium text-sm">
                    {orderData?.rating} Stars
                  </p>
                  <RatingStars rating={orderData?.rating} />
                </div>
                <p className="font-medium">Your Review:</p>
                <p className="ml-3 text-sm text-gray-400">
                  {orderData?.review}
                </p>
              </div>
            ) : sellerView ? (
              <div>
                <p className="text-center text-lg font-semibold my-2">Note Rated till yet</p>
              </div>
            ) : (
              <div>
                <p className="font-medium my-2">Rate the Product: </p>
                <StarBox rating={stars} setRatings={setStars} />
                <p className="font-medium mt-4 mb-2">
                  Give honest review of the product:{" "}
                </p>
                <textarea
                  className="w-full p-[6px]  text-gray-600 text-sm rounded-md outline-none border-gray-300 border"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  placeholder="Enter your Review"
                />
                <button
                  onClick={onSubmit}
                  disabled={!stars || !review}
                  className="p-2 bg-green-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400  mt-4  w-24 text-center font-semibold text-green-600 rounded-md"
                >
                  Submit
                </button>
              </div>
            )}
            <div>
              <TrackOrder status={orderData.status} />
            </div>
            <div
              onClick={onClose}
              className="cursor-pointer bg-violet-500 rounded-md p-2 my-6 text-center text-white font-semibold"
            >
              Close
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
