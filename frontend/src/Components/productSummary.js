import React from "react";
import { useNavigate } from "react-router-dom";
import StripePayment from "./StripePayment";

export default function ProductSummary({
  cartData,
  buttonText,
  path,
  setAmount,
  paymentMethod = "",
  cart = false,
}) {
  console.log("Cart Data-----", cartData);
  const navigate = useNavigate();
  const totalPrice = cartData.reduce((total, current) => {
    return (
      total + parseFloat(current.product.price) * parseInt(current.quantity)
    );
  }, 0);
  const shippingCharges = cartData.reduce((total, current) => {
    return total + parseFloat(current.product.shippingPrice);
  }, 0);
  console.log("Shipping Charges", shippingCharges);
  const items = cartData.reduce((total, current, paymentMethod) => {
    return total + current.quantity;
  }, 0);
  console.log("set Amount______", setAmount);
  if (setAmount) {
    setAmount(totalPrice);
  }
  console.log("Items", items);
  return (
    <div className="shadow-lg border-2  border-gray-100 mb-8 p-4 rounded-lg">
      <p className="text-xl text-center font-medium mb-2">Product Summary</p>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Items</p>
        <p>{items}</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Items Price</p>
        <p>{totalPrice}</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-medium font-semibold">Shipping Price</p>
        <p>{shippingCharges}</p>
      </div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-lg my-1 font-semibold">SubTotal</p>
        <p>{shippingCharges + totalPrice}</p>
      </div>
      {cart ? (
        <div
          onClick={() => navigate(path)}
          className="bg-violet-500 p-[6px] rounded-md cursor-pointer"
        >
          <p className="text-lg text-center text-white font-semibold">
            Place Order
          </p>
        </div>
      ) : paymentMethod === "blockchain" ? (
        <div
          className="bg-violet-500 text-white text-center text-lg font-semibold p-2 mt-2 rounded-md cursor-pointer"
          onClick={() =>
            navigate(path, { state: { amount: shippingCharges + totalPrice } })
          }
        >
          {buttonText}
        </div>
      ) : (
        <div>
          {paymentMethod === "bank" && (
            <StripePayment amount={shippingCharges + totalPrice} />
          )}
        </div>
      )}
      {}
    </div>
  );
}