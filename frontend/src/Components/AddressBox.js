import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { connect } from "react-redux";
import { SAVE_SHIPPING_DETAILS } from "../Redux/Constants";

import { useNavigate } from "react-router-dom";

function AddressBox({ address, selectShippingAddress }) {
  const navigate = useNavigate();
  const onSelect = () => {
    selectShippingAddress(address);
    navigate("/paymentMethod");
  };

  console.log("---------", address);

  return (
    <div
      onClick={onSelect}
      className="shadow-lg shadow-gray-300 border border-gray-200 p-4 rounded-md mb-8 cursor-pointer"
    >
      <div className="flex ">
        <MdLocationPin size={28} />
        <div className="flex-1 mx-2">
          <p className="font-medium">{address.name}</p>
          <p className="mt-1 text-sm">{address.phoneNumber}</p>
          <p className="bg-orange-100 text-orange-600 font-semibold  p-1 text-center rounded-md w-20 mt-2">
            {address.place}
          </p>
          <p className="text-sm my-4">
            {address.address}, {address.area}, {address.city},{" "}
            {address.province}
          </p>
          {address.default && (
            <span className="text-sm border border-orange-500 text-orange-500 px-4 p-1  rounded-md">
              Default Shipping Address
            </span>
          )}
        </div>

        <div
          onClick={e => {
            e.stopPropagation();
            navigate("/shippingAddressFormScreen", {
              state: { shippingAddress: address },
            });
          }}
          className="flex cursor-pointer  space-x-1"
        >
          <span className="text-sm font-medium ">Edit</span>
          <AiOutlineEdit size={22} />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    selectShippingAddress: address => {
      dispatch({
        type: SAVE_SHIPPING_DETAILS,
        payload: address,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(AddressBox);
