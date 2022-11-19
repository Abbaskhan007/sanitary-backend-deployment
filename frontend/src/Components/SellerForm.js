import React, { useState } from "react";
import Axios from "axios";
import Select from "react-select";
import { IoCloseOutline } from "react-icons/io5";
import { connect } from "react-redux";

function SellerForm({ user, productCategories }) {
  console.log("Product categories----", productCategories);
  const [openModel, setOpenModel] = useState(false);

  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    const categoriesValue = categories.map(category => category.value);
    if (!categories || !description) {
      alert("Please Fill all the fields");
      return;
    }
    const data = { categories: categoriesValue, description, user };
    try {
      const response = await Axios.post(
        "/api/sellerRequests/sendSellerRequest",
        data
      );
      console.log("Response", response);
      if (response.status === 200) {
        setOpenModel(false);
        alert("Seller Request Sent successfully");
      }
    } catch (err) {
      alert(err.response.data.message || err.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModel(true)}
        className="bg-green-200 w-52 p-3 rounded-md "
      >
        Send Seller Request
      </button>
      {openModel ? (
        <div className="bg-black/50 fixed h-full inset-0 -top-6 flex items-center justify-center">
          <div className="w-[450px] relative bg-white p-6 rounded-md max-h-[calc(100vh-160px)] overflow-y-scroll">
            <IoCloseOutline
              onClick={() => setOpenModel(false)}
              className="absolute  cursor-pointer right-1 top-1 bg-black/30 font-semibold text-white text-2xl rounded-full p-[2px]"
            />
            <h1 className="text-xl font-medium text-center mb-4">
              Seller Request
            </h1>
            <div>
              <label className="text-lg font-medium ">Categories</label>
              <Select
                isMulti
                name="categories"
                options={productCategories}
                className="basic-multi-select"
                classNamePrefix="select"
                className="bg-red-200 mt-1"
                placeholder="Please Select the categories"
                onChange={setCategories}
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium ">Description</label>
              <textarea
                className="outline-none border-2 border-gray-200 p-1 rounded-md w-full mt-1"
                placeholder="Enter Your Details e.g. Inroduction, Why you want to Join, Experience"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="flex space-x-8 justify-end py-4 pt-8">
              <button
                className="bg-red-500 p-2 px-6 text-white rounded-md text-lg font-medium"
                onClick={() => setOpenModel(false)}
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className={`${
                  !description || categories.length < 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500"
                }  p-2 px-6 text-white rounded-md text-lg font-medium`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  const productCategories = state.categories.productCategories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    user: state.user.user._id,
    productCategories,
  };
};

export default connect(mapStateToProps, null)(SellerForm);
