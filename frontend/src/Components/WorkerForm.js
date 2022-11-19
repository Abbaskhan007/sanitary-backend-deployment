import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { MODEL_CLOSE, MODEL_OPEN } from "../Redux/Constants";
import Select from "react-select";
import { IoCameraOutline, IoCloseOutline } from "react-icons/io5";
import Axios from "axios";
import Loading from "./Loading";

function WorkerForm({
  showModel,
  openModel,
  closeModel,
  user,
  workerCategories,
}) {
  const imageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cloudinaryFormatImages, setCloudinaryFormatImages] = useState([]);


  const onImageChange = e => {
    console.log("()", e.target.files[0]);
    setImages([...images, URL.createObjectURL(e.target.files[0])]);
    setCloudinaryFormatImages([...cloudinaryFormatImages, e.target.files[0]]);
  };

  const onDelete = imageIndex => {
    const updateImages = images.filter((image, index) => imageIndex !== index);
    setImages(updateImages);
    const updateCloudinaryImages = cloudinaryFormatImages.filter(
      (image, index) => imageIndex !== index
    );
    setCloudinaryFormatImages(updateCloudinaryImages);
  };

  console.log(images);

  const onCameraClicked = () => {
    imageRef.current.click();
  };

  console.log("Loading", loading);
  const onSubmit = async () => {
    const categoriesValue = categories.map(category => category.value);

    setLoading(true);
    const cloudinaryImages = await Promise.all(
      cloudinaryFormatImages.map(async image => {
        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", "sanitary");
        imageData.append("folder", "workers");
        const response = await Axios.post(
          "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
          imageData
        );
        console.log("Response of cloudinary", response);
        return response.data.url;
      })
    );

    console.log("Response of cloudinary*********", cloudinaryImages);

    const workerData = {
      price,
      description,
      images: cloudinaryImages,
      user: user._id,
      categories: categoriesValue,
      city,
    };
    console.log("Data", workerData);
    try {
      const response = await Axios.post(
        "/api/workerRequests/sendWorkerRequest",
        workerData
      );
      if (response.status === 200) {
        alert("Worker Request Sent");
        closeModel();
        console.log("Data of Worker ***", response.data);
      }
    } catch (err) {
      console.log("error", err.response.data.message);
      alert(err.response.data.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        disabled={user.isWorker}
        onClick={openModel}
        className="bg-green-200 w-52 p-3 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        Send Worker Request
      </button>
      {showModel ? (
        <div
          //onClick={closeModel}
          className="bg-black/50 fixed inset-0 -bottom-3  align-middle flex items-center justify-center"
        >
          <div className="bg-white w-[500px] relative opacity-100 p-6 shadow-lg rounded-md flex-col overflow-y-scroll max-h-[calc(100vh-160px)]">
            {loading ? (
              <Loading />
            ) : (
              <>
                <IoCloseOutline
                  onClick={closeModel}
                  className="absolute  cursor-pointer right-1 top-1 bg-black/30 font-semibold text-white text-2xl rounded-full p-[2px]"
                />
                <h3 className="text-xl font-medium text-center mb-4">
                  Worker Model
                </h3>
                <div className=" flex-col space-y-4 ">
                  <div>
                    <label className="text-lg font-medium ">Categories</label>
                    <Select
                      isMulti
                      name="categories"
                      options={workerCategories}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      className="bg-red-200 mt-1"
                      placeholder="Please Select the categories"
                      onChange={setCategories}
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium ">
                      Price
                      <span className="text-sm text-gray-400 ml-1">
                        (Rs / hour)
                      </span>
                    </label>
                    <br />
                    <input
                      pattern="[0-9]*"
                      className="outline-none border-2 border-gray-200 p-1 rounded-md mt-1"
                      type="number"
                      placeholder="Enter Price Per Hour"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium ">City</label>
                    <input
                      type="text"
                      className="outline-none border-2 border-gray-200 p-1 rounded-md w-full mt-1"
                      placeholder="Enter City Name"
                      name="city"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-lg font-medium ">Description</label>
                    <textarea
                      className="outline-none border-2 border-gray-200 p-1 rounded-md w-full mt-1"
                      placeholder="Enter Your Details e.g. Inroduction, Why you want to Join, Experience"
                      name="description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </div>
                  <input
                    onChange={onImageChange}
                    ref={imageRef}
                    type="file"
                    className="hidden"
                  />
                  <div>
                    <label className="text-lg font-medium ">Upload Image</label>
                    <IoCameraOutline
                      onClick={onCameraClicked}
                      className="text-gray-400 text-8xl border-2 border-gray-200 p-4 rounded-md mx-auto cursor-pointer mt-2"
                    />
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 items-center">
                      {images.map((image, index) => (
                        <div className=" relative group">
                          <img src={image} className="w-full  " />
                          <IoCloseOutline
                            onClick={() => onDelete(index)}
                            className="absolute hidden group-hover:block cursor-pointer right-1 top-1 bg-white border-2 text-2xl rounded-full p-[2px]"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex space-x-8 justify-end py-4 pt-8">
                    <button
                      className="bg-red-500 p-2 px-6 text-white rounded-md text-lg font-medium"
                      onClick={closeModel}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSubmit}
                      className={`${
                        !price || !description || categories.length < 1
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500"
                      }  p-2 px-6 text-white rounded-md text-lg font-medium`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => {
  const workerCategories = state.categories.workerCategories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    showModel: state.model.modelOpen,
    user: state.user.user,
    workerCategories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModel: () => {
      dispatch({ type: MODEL_OPEN });
    },
    closeModel: () => {
      dispatch({ type: MODEL_CLOSE });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerForm);
