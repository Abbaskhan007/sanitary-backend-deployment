import React, { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { connect } from "react-redux";
import OrderItem from "../Components/OrderItem";
import ProductSummary from "../Components/productSummary";


function OrderDetails({ shipping, cart, paymentMethod }) {
  const [amount, setAmount] = useState(0);
  
  console.log("Amount", amount, paymentMethod);

  return (
    <div className="p-4">
      <CheckoutSteps step={4} />
      <div className="grid md:grid-cols-3 gap-10 ">
        <div className="md:col-span-2">
          <div className="p-4 border-2 rounded-lg bg-violet-100 border-gray-200 mb-5">
            <p className="text-lg font-bold mb-2">Shipping</p>
            <div>
              <span className="text-md font-bold">Name: </span>
              <span className="text-md font-medium">{shipping.name}</span>
            </div>
            <div className="my-1">
              <span className="text-md font-bold">Address: </span>
              <span className="text-md font-medium">{shipping.address}, {shipping.area}, {shipping.city},{" "}
            {shipping.province}</span>
            </div>
          </div>
          <div className="p-4 border-2 rounded-lg bg-violet-100 border-gray-200 mb-5">
            <p className="text-lg font-bold mb-2">Payment</p>
            <div>
              <span className="text-md font-bold">Method: </span>
              <span className="text-md font-medium">{paymentMethod}</span>
            </div>
          </div>
          <div className="p-4 border-2 rounded-lg bg-violet-100 border-gray-200 mb-5">
            <p className="text-lg font-bold mb-2">Order Items</p>
            <div>
              {cart.map((item, index) => (
                <OrderItem index={index} item={item} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <ProductSummary
            buttonText="Pay Now"
            path="/blockchainPayment"
            cartData={cart}
            setAmount={setAmount}
            paymentMethod={paymentMethod}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(")_--------", state.cart);
  return {
    shipping: state.cart.shipping,
    cart: state.cart.cart,
    paymentMethod: state.cart.payment,
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
