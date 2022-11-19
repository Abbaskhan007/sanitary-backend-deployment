import React from "react";

export default function Menu({
  items,
  activeMenu,
  updateOrderStatus,
  orderId,
  storeId,
}) {
  console.log("Items", items);
  const onStatusClick = item => {
    updateOrderStatus(orderId, item, storeId);
  };
  return (
    <div className="absolute z-20 bg-white border border-gray-400 rounded-md -top-[0px] mt-2 -right-[120px]">
      {items.map((item, index) => (
        <div
          onClick={() => {
            onStatusClick(item);
          }}
          className={`px-8 py-[6px] ${
            items.length - 1 !== index && "border-b border-gray-400"
          } ${
            activeMenu === item && "font-medium text-violet-500"
          }  z-10 text-sm hover:bg-gray-200 cursor-pointer`}
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
