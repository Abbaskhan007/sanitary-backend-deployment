import React, { useState } from "react";
import ErrorBox from "../Components/ErrorBox";
import Axios from "axios";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { AiFillHome } from "react-icons/ai";
import { BsBriefcaseFill } from "react-icons/bs";
import url from "../Constants";

function ShippingAddressFormScreen({ user }) {
  const { state } = useLocation();
  const shippingAddress = state.shippingAddress;
  const [name, setName] = useState(shippingAddress?.name);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber);
  const [province, setProvince] = useState(shippingAddress?.province);
  const [city, setCity] = useState(shippingAddress?.city);
  const [area, setArea] = useState(shippingAddress?.area);
  const [address, setAddress] = useState(shippingAddress?.address);
  const [error, setError] = useState(false);
  const [type, setType] = useState(shippingAddress?.place ?? "home");
  const [openSwitch, setOpenSwitch] = useState(
    shippingAddress?.default ?? false
  );

  console.log("Action", state.action);

  const navigate = useNavigate();

  const onSave = async () => {
    if (
      !name ||
      !phoneNumber ||
      !province ||
      !city ||
      !area ||
      !address ||
      !type
    ) {
      return alert("Please Fill All the Input Fields");
    }
    const shipping = {
      name,
      phoneNumber,
      province,
      city,
      area,
      address,
      place: type,
      default: openSwitch,
      user: user._id,
    };

    console.log("Shipping", shipping);

    if (state.action === "new") {
      const { data } = await Axios.post(`${url}/shippingAddress/add`, {
        userId: user._id,
        shipping,
      });
      console.log("Data", data);
      alert("Shipping Address Added Successfully");
      navigate(-1);
    } else {
      const { data } = await Axios.put(`${url}/shippingAddress/edit`, {
        shippingData: shipping,
        shippingAddressId: shippingAddress._id,
      });
      console.log("Data of editing", data);
      alert("Shipping Address Updated Successfully");
      navigate(-1);
    }
  };

  const onDelete = async () => {
    console.log("____________");
    const response = await Axios.delete(
      `${url}/shippingAddress/delete/${shippingAddress._id}`
    );
    console.log("Response of Delete", response);
    if (response.status === 200) {
      alert("Address Deleted Successfully");
      navigate(-1);
    } else {
      alert(response.data.message);
    }
  };

  console.log("Type", type);

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="flex  justify-center flex-col sm:w-[500px] w-[90%]">
        {error && <ErrorBox message="Fill all the values" variant="fail" />}

        <label className="text-sm font-semibold mb-1">Full Name</label>
        <input
          className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          placeholder="Enter Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label className="text-sm font-semibold mb-1">Phone Number</label>
        <input
          className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <label className="text-sm font-semibold mb-1">Province</label>
        <input
          className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          placeholder="Enter Province Name"
          value={province}
          onChange={e => setProvince(e.target.value)}
        />
        <label className="text-sm font-semibold mb-1">City</label>
        <input
          className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          placeholder="Enter City Name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <label className="text-sm font-semibold mb-1">Area</label>
        <input
          className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          placeholder="Enter Your Area"
          value={area}
          onChange={e => setArea(e.target.value)}
        />
        <label className="text-sm font-semibold mb-1">Address</label>
        <input
          className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          placeholder="Enter Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <div className="my-4 flex flex-row items-center space-x-4">
          <span className="text-lg font-medium">Default: </span>
          <Switch onChange={setOpenSwitch} checked={openSwitch} />
        </div>
        <p className="text-sm font-semibold mb-2 mt-4 ">
          Select Location Type
        </p>
        <div className="flex items-center justify-center space-x-8 mb-6">
          <div
            onClick={() => setType("office")}
            className={`${
              type === "office"
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-100 text-gray-500 "
            } font-medium w-32 justify-center p-4 rounded-md flex items-center space-x-3 cursor-pointer`}
          >
            <BsBriefcaseFill />
            <p>Office</p>
          </div>
          <div
            onClick={() => setType("home")}
            className={`${
              type === "home"
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-100 text-gray-500 "
            } font-medium w-32 p-4 rounded-md flex justify-center items-center space-x-3 cursor-pointer`}
          >
            <AiFillHome />
            <p>Home</p>
          </div>
        </div>

        <div
          onClick={onSave}
          className="bg-violet-500 text-lg font-semibold text-center p-2 shadow-md text-white rounded-md my-2 cursor-pointer mb-3"
        >
          Submit
        </div>
        {state.action !== "new" && <div
          onClick={onDelete}
          className="bg-violet-500 text-lg font-semibold text-center p-2 shadow-md text-white rounded-md my-2 cursor-pointer mb-8"
        >
          Delete
        </div>}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(ShippingAddressFormScreen);
