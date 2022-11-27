import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Select from "react-select";
import ProductCard from "../Components/ProductCard";
import ErrorBox from "../Components/ErrorBox";
import { MdModeEditOutline } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { connect } from "react-redux";
import { store } from "../Redux/rootReducer";

function EditStore({ products, productCategories }) {
  const imageRef = useRef(null);
  const [storeData, setStoreData] = useState({});
  const { storeId } = useParams();
  console.log(storeId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(null);
  const [cloudinaryImage, setCloudinaryImage] = useState(false);
  const [category, setCategory] = useState({
    value: "Urinals",
    label: "Urinals",
  });
  const [error, setError] = useState(null);
  const data = [
    { value: "Urinals", label: "Urinals" },
    { value: "Basins", label: "Basins" },
    { value: "Showers", label: "Showers" },
  ];

  const fetchStoreData = async () => {
    console.log(
      "********************************----------------------------------"
    );
    try {
      const response = await Axios.get(`/api/stores/getStore/${storeId}`);
      setStoreData(response.data);
      setName(response.data.name);
      setImage(response.data.image);
      setDescription(response.data.description);
      const storeCtg = response.data.category.map(ctg => {
        return { label: ctg, value: ctg };
      });
      setCategory(storeCtg);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    fetchStoreData();
  }, [products]);

  console.log("StoreData", storeData);

  const onSave = async () => {
    setError(null);
    if (!name || !description || !category || !image) {
      setError("Please Fill all the fields");
    } else {
      try {
        let cloudinayResponse;
        if (cloudinaryImage) {
          const form = new FormData();
          form.append("file", cloudinaryImage);
          form.append("upload_preset", "sanitary");
          form.append("folder", "stores");
          cloudinayResponse = await Axios.post(
            "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
            form
          );
        }
        const data = {
          ...storeData,
          name,
          description,
          category: category.value,
          image: cloudinayResponse?.data?.url || image,
        };
        const response = await Axios.put("/api/stores/updateStore", data);
        console.log("Response", response);
        if (response.status === 200) {
          alert("Store Updated Successfully");
          fetchStoreData();
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const onChangeImage = e => {
    setShowImage(URL.createObjectURL(e.target.files[0]));
    setCloudinaryImage(e.target.files[0]);
  };

  return (
    <div className="min-h-[calc(100vh-150px)] ">
      <div className="sm:px-12 px-4 flex items-center justify-center">
        <div className="flex  justify-center flex-col sm:w-[500px] py-8">
          <h1 className="sm:text-3xl text-lg font-medium mb-8 text-center">
            Edit Store
          </h1>
          {error && <ErrorBox variant="fail" message={error} />}
          <div
            onClick={() => imageRef.current.click()}
            className="max-w-max relative self-center  rounded-full mb-8 mt-4 cursor-pointer"
          >
            <MdModeEditOutline
              className="absolute sm:right-8 sm:bottom-2 right-4 bottom-1 bg-black/50 p-1 rounded-full  text-white"
              size={24}
              color="#fff"
            />
            <img
              className="sm:w-48 sm:h-48 h-32 w-32 rounded-full self-center  mx-auto border"
              src={showImage ? showImage : image}
            />
          </div>

          <input
            className="hidden"
            ref={imageRef}
            type="file"
            onChange={onChangeImage}
          />

          <label className="text-sm font-semibold mb-1 ">Name</label>
          <input
            placeholder="Enter Store Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />
          <label className="text-sm font-semibold mb-1 ">Description</label>
          <textarea
            placeholder="Enter Store Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
          />
          <label className="text-sm font-semibold mb-1 ">Category</label>
          <Select
            isMulti
            name="categories"
            options={productCategories}
            className="basic-multi-select"
            classNamePrefix="select"
            className="bg-red-200 mt-1"
            placeholder="Please Select the categories"
            onChange={setCategory}
            value={category}
          />
          <button
            onClick={onSave}
            className="bg-violet-500 p-2 text-white text-xl font-medium rounded-md mt-8"
          >
            Save
          </button>
          <h2 className="text-3xl text-medium my-8">Products</h2>
          <NavLink
            to="uploadProduct"
            className="flex bg-violet-500 items-center space-x-8 justify-center text-white mb-8 p-2 text-xl rounded-md "
          >
            <BsUpload className="font-semibold" size={24} />
            <h2 className="font-semibold">Add Product</h2>
          </NavLink>
          <div className="grid   lg:grid-cols-2 sm:grid-cols-1 gap-8 ">
            {storeData?.products?.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const productCategories = state.categories.productCategories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    products: state.productList.products,
    productCategories,
  };
};

export default connect(mapStateToProps, null)(EditStore);
