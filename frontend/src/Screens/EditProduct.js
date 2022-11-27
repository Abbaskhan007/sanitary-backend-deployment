import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { IoCameraOutline, IoCloseOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Components/Loading";
import { connect } from "react-redux";

function EditProduct({ productCategories }) {
  const { productId } = useParams();
  console.log("Use PArams", productId);
  const imageRef = useRef(null);

  const [productData, setProductData] = useState({});
  const [name, setName] = useState(null);
  const [description, setDescrption] = useState(null);
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [images, setImages] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [categories, setCategories] = useState(null);
  const [cloudinaryImages, setCloudinaryImage] = useState([]);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);
  const [realImages, setRealImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const onImageChange = e => {
    console.log("()", e.target.files[0]);
    let objectUrl = URL.createObjectURL(e.target.files[0]);
    setImages([...images, objectUrl]);
    setCloudinaryImage([
      ...cloudinaryImages,
      {
        cloudinary: e.target.files[0],
        url: objectUrl,
      },
    ]);
  };

  console.log("Iamges-----", cloudinaryImages);

  const fetchProduct = async () => {
    const product = await Axios.get(`/api/products/getProduct/${productId}`);
    setProductData(product.data);
    console.log("Product", product.data);
    setName(product.data.name);
    setDescrption(product.data.description);
    setPrice(product.data.price);
    setInStock(product.data.inStock);
    setImages(product.data.images);
    setShippingPrice(product.data.shippingPrice);
    setRealImages(product.data.images);
    setModel(product.data.model);
    setCategories({
      label: product.data.category,
      value: product.data.category,
    });
  };

  console.log("ProductData---------************", productData);

  console.log("Categories", categories);
  console.log("Product Data", productData);

  const onDelete = image => {
    const updatedImages = images.filter(img => img !== image);

    const updatedCloudinaryImages = cloudinaryImages.filter(
      img => img?.url !== image
    );

    const updateRealImages = realImages.filter(img => img !== image);
    setRealImages(updateRealImages);
    setCloudinaryImage(updatedCloudinaryImages);
    setImages(updatedImages);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const onSave = async () => {
    setLoading(true);
    setError(null);
    if (
      images.length === 0 ||
      !description ||
      !categories ||
      !price ||
      !inStock ||
      !name ||
      !shippingPrice ||
      !model
    ) {
      alert("Please Fill All Input Fields");
      setError("Please Fill All Input Fields");
    } else {
      console.log("Cloudinary Images (1)", cloudinaryImages);
      const uploadedImages = await Promise.all(
        cloudinaryImages.map(async image => {
          const imageData = new FormData();
          imageData.append("file", image.cloudinary);
          imageData.append("upload_preset", "sanitary");
          data.append("folder", "products");
          const response = await Axios.post(
            "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
            imageData
          );
          return { url: response.data.url, public_id: response.data.public_id };
        })
      );
      console.log("Uploaded Images (2)", uploadedImages);
      setRealImages([...realImages, ...uploadedImages]);
      console.log(
        "----------------------------- Real Images (3)",
        [...realImages, ...uploadedImages],
        "--------",
        realImages
      );
      const data = {
        name,
        images: [...realImages, ...uploadedImages],
        description,
        price,
        inStock,
        shippingPrice,
        category: categories.value,
        model,
      };
      try {
        const response = await Axios.put(
          `/api/products/updateProduct/${productData._id}`,
          data
        );
        console.log("response*********************** (4)", response);
        if (response.status === 200) {
          toast.success("Product Updated Successfully!!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          fetchProduct();
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
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
  console.log("Model", productData.model);
  console.log("Real Images--------------------", realImages);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="min-h-[calc(100vh-150px)] ">
        <div className="sm:px-12 px-4 flex items-center justify-center">
          <div className="flex  justify-center flex-col sm:w-[500px] py-8">
            <ToastContainer />
            <h1 className="sm:text-3xl text-lg font-medium sm:mb-8 mb-4 text-center">
              Edit Product
            </h1>
            <label className="text-sm font-semibold mb-1 ">Name</label>
            <input
              placeholder="Enter Product Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            />

            <label className="text-sm font-semibold mb-1 ">Price</label>
            <input
              placeholder="Enter Product Price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            />
            <label className="text-sm font-semibold mb-1 ">InStock</label>
            <input
              placeholder="Enter Product Price"
              value={inStock}
              onChange={e => setInStock(e.target.value)}
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            />
            <label className="text-sm font-semibold mb-1 ">
              Shipping Price
            </label>
            <input
              placeholder="Enter Shipping Price"
              value={shippingPrice}
              onChange={e => setShippingPrice(e.target.value)}
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            />
            <label className="text-sm font-semibold mb-1 ">Description</label>
            <input
              placeholder="Enter Product Description"
              value={description}
              onChange={e => setDescrption(e.target.value)}
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            />
            <label className="text-sm font-semibold mb-1 ">3D Model</label>
            <input
              placeholder="Enter 3D Model URL (.glb)"
              value={model}
              onChange={e => setModel(e.target.value)}
              className="border-2 border-gray-200 p-1 px-2 rounded-md mb-4"
            />
            <label className="text-sm font-semibold mb-1 ">
              Product Category
            </label>
            <Select
              name="categories"
              options={productCategories}
              className="basic-multi-select"
              classNamePrefix="select"
              className=" mt-1"
              placeholder="Please Select the categories"
              onChange={setCategories}
              value={categories}
            />
            <input
              onChange={onImageChange}
              ref={imageRef}
              type="file"
              className="hidden"
            />
            <div className="mt-8">
              <label className="text-lg font-medium ">Upload Image</label>
              <IoCameraOutline
                onClick={() => imageRef.current.click()}
                className="text-gray-400 text-8xl border-2 border-gray-200 p-4 rounded-md mx-auto cursor-pointer mt-2"
              />
            </div>
            <div className="my-8">
              <h1 className="text-3xl mb-4">Product Images</h1>
              <div className="grid sm:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {images?.map(image => (
                  <div className="relative group hover:bg-black hover:rounded-md">
                    <img
                      className="rounded-md shadow-lg shadow-gray-300 border-gray-300 border  h-full group-hover:opacity-50 w-full"
                      src={image.url ? image.url : image}
                    />
                    <IoCloseOutline
                      onClick={() => onDelete(image)}
                      size={24}
                      className="absolute top-1 right-1 cursor-pointer hidden group-hover:block bg-white opacity-80 rounded-full p-1"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={onSave}
              className="bg-violet-500 text-lg p-2 text-white rounded-md font-medium"
            >
              Save
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
    productCategories,
  };
};

export default connect(mapStateToProps, null)(EditProduct);
