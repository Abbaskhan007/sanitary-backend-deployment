import React from "react";

export default function ({ item, index }) {
  console.log("Item", item);
  const { product, quantity } = item;
  return (
    <div
      className={`flex items-center   py-4 ${
        index && "border-t-2  border-gray-300"
      } `}
    >
      <img src={product.images[0].url} className="sm:w-24 sm:h-24 h-16 w-16 rounded-md mr-4 sm:mr-8" />
      <p className="sm:text-lg sm:font-semibold text-sm font-medium flex-1">{product.name}</p>
      <p className="font-semibold">{`${product.price} x ${quantity} = ${
        product.price * quantity
      }`}</p>
    </div>
  );
}
