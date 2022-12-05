import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  IoCheckmarkSharp,
  IoChevronDownSharp,
  IoChevronUpOutline,
  IoCloseSharp,
} from "react-icons/io5";
import { connect } from "react-redux";
import url from "../Constants";

function SellerRequests() {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await Axios.get(`${url}/sellerRequests`);
    if (response.status === 200) {
      setRequests(response.data);
    }
  };

  const onAccept = async (userId, requestId) => {
    try {
      const response = await Axios.put(`${url}/sellerRequests/acceptRequest`, {
        userId,
        requestId,
      });

      console.log("Requests", response);
      const { categories, description, user } = response.data;
      Axios.post(`${url}/seller/createSeller`, {
        categories,
        description,
        user: user,
      });
      fetchRequests();
    } catch (err) {
      alert(err.message);
    }
  };

  const onReject = async (userId, requestId) => {
    try {
      const response = await Axios.put(`${url}/sellerRequests/rejectRequest`, {
        requestId,
      });
      fetchRequests();
    } catch (err) {
      alert(err.message);
    }
  };

  console.log("Seller requests", requests);
  if (requests.length <= 0) {
    return (
      <div className="flex items-center justify-center w-[full]  h-[calc(100vh-160px)]">
        <p className="text-3xl font-medium text-center">No Requests Present</p>
      </div>
    );
  } else {
    return (
      <div className="w-full grid  gap-4 lg:grid-cols-2">
        {requests.map(request => (
          <div className="border border-gray-200 shadow-lg w-full px-4 py-2 mb-4 rounded-md">
            <div className="flex items-center space-x-4 mb-4">
              <img
                className="w-20 h-20 rounded-full"
                src={request.user?.profileImage}
              />
              <h4 className="text-xl ">{request.user?.name}</h4>
            </div>
            <div className="flex items-center mt-2">
              <p className="text-medium font-medium mb-2">Categories: </p>
              <div className="flex items-center ml-4  flex-wrap">
                {request?.categories.map(category => (
                  <p className="px-4 mr-3 mb-2 py-1 border cursor-pointer rounded-md border-gray-200">
                    {category}
                  </p>
                ))}
              </div>
            </div>
            <p className={`${!show && "line-clamp-3"} my-2`}>
              {request.description}
            </p>
            {!show ? (
              <button
                onClick={() => setShow(true)}
                className="flex items-center border border-gray-300 rounded-md text-sm p-1 my-4 "
              >
                {" "}
                Show more <IoChevronDownSharp className="ml-2" />
              </button>
            ) : (
              <button
                onClick={() => setShow(false)}
                className="flex items-center border border-gray-300 rounded-md text-sm p-1 my-4"
              >
                {" "}
                Show Less <IoChevronUpOutline className="ml-2" />
              </button>
            )}
            <div className="flex items-center space-x-6 justify-end mb-2">
              <p
                onClick={() => onAccept(request.user._id, request._id)}
                className="bg-green-400 p-[6px] rounded-full text-white text-2xl cursor-pointer"
              >
                {" "}
                <IoCheckmarkSharp />
              </p>
              <p
                onClick={() => onReject(request._id)}
                className="bg-red-400 p-[6px] rounded-full text-white text-2xl cursor-pointer"
              >
                <IoCloseSharp />
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SellerRequests;
