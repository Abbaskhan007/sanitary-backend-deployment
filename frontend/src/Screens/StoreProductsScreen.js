import React from "react";
import ProductCard from "../Components/ProductCard";

export default function StoreProductsScreen({ products }) {
  if (products?.length <= 0) {
    return (
      <div>
        <p className="text-2xl text-semibold text-gray-500 my-24">
          No Product in present in this store
        </p>
      </div>
    );
  } else {
    return (
      <div className="grid  md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8  bg-[#ffffff]">
        {products?.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }
}
