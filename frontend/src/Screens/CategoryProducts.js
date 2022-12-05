import React, { useState, useEffect } from "react";
import { useParams, useRoutes } from "react-router-dom";
import Axios from "axios";
import ProductCard from "../Components/ProductCard";
import url from "../Constants";

export default function CategoryProducts() {
  const [productList, setProductList] = useState([]);
  const { category } = useParams();
  const fetchProducts = async () => {
    const { data } = await Axios.get(
      `${url}/products/getCategoryProducts/${category}`
    );
    setProductList(data);
    console.log("Data----", data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("----------", category);
  return (
    <div className="px-6 sm:px-12 mt-8">
      <h2 className="text-center text-4xl mb-10  border-b-[2px] border-gray-300 pb-2 max-w-[350px] font-light mx-auto">
        {category}
      </h2>
      {productList.length > 0 ? (
        <div className="grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 space-y-6 sm:space-y-0 sm:gap-8  bg-[#ffffff]">
          {productList.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex -mt-12 h-full items-center justify-center">
          <p className="text-red-400 text-xl font-semibold">
            No Products Present
          </p>
        </div>
      )}
    </div>
  );
}
