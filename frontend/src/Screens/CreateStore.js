import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useRef } from "react";
import { IoCameraOutline, IoCloseOutline } from "react-icons/io5";
import Select from "react-select";
import { connect } from "react-redux";
import ErrorBox from "../Components/ErrorBox";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

function CreateStore({ seller, productCategories }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState({});
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("Set categories", category);

  const cameraRef = useRef(null);
  const navigate = useNavigate();

  const onImageChange = e => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setShowImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async () => {
    setLoading(true);
    if (!name || !category || !description || !image) {
      setError("Please Enter all the fields");
    } else {
      const form = new FormData();
      form.append("file", image);
      form.append("upload_preset", "sanitary");
      form.append("folder", "stores");
      const cloudinayResponse = await Axios.post(
        "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
        form
      );

      const storeCategories = category.map(ctg => ctg.label);

      const data = {
        name,
        category: storeCategories,
        image: cloudinayResponse.data.url,
        seller,
        description,
      };

      try {
        const response = await Axios.post("/api/stores/createStore", data);
        console.log("Store Creating Response", response);

        if (response.status === 200) {
          toast.success("Store Created Successfully!!!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => navigate("/sellerDashboard/stores"),
          });
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    setLoading(false);
  };
  console.log("-------",category, description)
  
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="min-h-[calc(100vh-150px)] ">
        <div className="sm:px-12 px-2 flex items-center justify-center">
          <div className="flex justify-center flex-col w-[90%] sm:w-[500px] py-8">
            <ToastContainer />
            <h1 className="sm:text-3xl text-lg font-medium mb-8 text-center">
              Create Store
            </h1>
            {error && <ErrorBox variant="fail" message={error} />}
            <label className="text-sm font-semibold mb-1">Store Name</label>
            <input
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
              placeholder="Enter Store Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label className="text-sm font-semibold mb-1">
              Store Description
            </label>
            <textarea
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
              placeholder="Enter Store Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <label className="text-sm font-semibold mb-1">Store Category</label>
            <Select
              isMulti
              name="categories"
              options={productCategories}
              className="basic-multi-select"
              classNamePrefix="select"
              className="bg-red-200 mt-1"
              placeholder="Please Select the categories"
              onChange={setCategory}
            />
            <label className="text-lg font-medium my-4">Upload Image</label>
            <input
              ref={cameraRef}
              className="hidden"
              type="file"
              onChange={e => onImageChange(e)}
            />
            <IoCameraOutline
              onClick={() => cameraRef.current.click()}
              className="text-gray-400 text-8xl border-2 border-gray-200 p-4 rounded-md mx-auto cursor-pointer mt-2"
            />
            {image && (
              <div className="flex my-6 ">
                <div className="relative bg-black  group rounded-md overflow-hidden ">
                  <img
                    className="w-52 h-52 shadow-md rounded-md  hover:opacity-50"
                    src={showImage}
                  />
                  <IoCloseOutline
                    //onClick={() => onDelete(index)}
                    className="absolute hidden group-hover:block cursor-pointer right-1 top-1 bg-white border-2 text-2xl rounded-full p-[2px]"
                  />
                </div>
              </div>
            )}
            <button
              onClick={onSubmit}
              className="bg-violet-500 p-2 text-white text-xl font-medium rounded-md mt-8"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const productCategories = state.categories.productCategories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    seller: state.seller._id,
    productCategories,
  };
};

export default connect(mapStateToProps, null)(CreateStore);
