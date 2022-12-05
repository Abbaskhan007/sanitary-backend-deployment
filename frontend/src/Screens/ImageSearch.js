import React, { useRef, useState } from "react";
import Axios from "axios";
import { GrCamera } from "react-icons/gr";
import { connect } from "react-redux";
import { PRODUCT_SEARCH } from "../Redux/Constants";
import url from "../Constants";

function ImageSearch({ fetchProducts, setLoading, executeScroll }) {
  const imageRef = useRef(null);

  const onChange = async event => {
    setLoading(true);
    try {
      console.log("*****", event.target.files[0]);
      const formData = new FormData();

      formData.append("file", event.target.files[0]);
      const { data } = await Axios.post(
        "http://127.0.0.1:4000/webFlaskSearchImage",
        formData
      );
      console.log("Data---", data);
      const public_ids = Object.values(data).map(
        item => `products/${item.split("/")[1].split(".")[0]}`
      );
      console.log("Public Ids", public_ids);
      const productData = await Axios.post(
        `${url}/products/imageSearch`,
        public_ids
      );
      setTimeout(executeScroll(), 1200);

      console.log("Product Data after image search: ", productData);
      fetchProducts(productData.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const onImagePress = () => {
    imageRef.current.click();
  };

  return (
    <div className="">
      <GrCamera onClick={onImagePress} size={24} color="#9ca3af" />
      <input
        ref={imageRef}
        className="hidden"
        type="file"
        name="file"
        onChange={event => onChange(event)}
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async data => {
      dispatch({
        type: PRODUCT_SEARCH,
        payload: data,
      });
    },
  };
};

//  ImageSearch;
export default connect(null, mapDispatchToProps)(ImageSearch);
