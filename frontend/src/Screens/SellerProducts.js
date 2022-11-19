import React, { useState, useEffect } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import ProductCard from "../Components/ProductCard";

function SellerProducts({ seller, products }) {
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await Axios.get(
        `/api/products//getSellerProducts/${seller}`
      );
      setProductData(response.data);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [products]);
  console.log("----------",seller,"___", products);
  if (productData.length <= 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-center text-2xl  text-gray-500">
          No products present
        </p>
      </div>
    );
  } else {
    return (
      <div className="py-8">
        <h2 className="text-3xl text-center text-medium my-8 ">Products</h2>
        <div className="grid   lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-8 ">
          {productData.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    seller: state.seller._id,
    products: state.productList.products,
  };
};

export default connect(mapStateToProps, null)(SellerProducts);
