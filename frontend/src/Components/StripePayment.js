import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EMPTY_CART } from "../Redux/Constants";
import url from "../Constants";

function StripePayment({
  amount,
  user,
  shippingAddress,
  paymentMethod,
  products,
  userId,
  emptyCart,
}) {
  console.log("-----------", user);
  const [showModal, setShowModal] = React.useState(false);
  console.log("Show Model----", showModal);
  const navigate = useNavigate();
  const payNow = async token => {
    try {
      const { data } = await Axios.post(`${url}/pay`, {
        amount,
        name: "khan",
        orderId: "007",
      });
      const orderData = {
        customerId: userId,
        shippingAddress: shippingAddress,
        paymentMethod,
       
      };
      const promise = products.map(async product => {
        const { data } = await Axios.post(`${url}/orders/create`, {
          ...orderData,
          amount: product.price,
          ...product,
        });
        console.log("Data", data);
      });
      console.log("PRomises", promise);
      Promise.all(promise).then(() => {
        setShowModal(true);
      });
      console.log("Data_____", data);
    } catch (error) {
      console.log("Error_____", error);
    }
  };

  const onOk = () => {
    emptyCart(userId);
    navigate("/");
    setShowModal(false);
  };

  const Model = () => {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="sm:text-2xl text-xl font-semibold">
                  Order Completed
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Order Placed Successfully. Thank you for purchasing.
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-2 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-8 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onOk}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51HgrsmFQ8VNGXjFtwPUTdZUmb1P15SIGe46mCpYt7ftLHjdCdYfGc2LH9nb6SnLcw3bxHIRVbwjPJNoG4qG2YhaH00BHd7uHbg"
        label="Pay Now"
        name="Pay With Credit Card"
        amount={amount * 100}
        description="Your total Price is"
        token={payNow}
        currency="pkr"
        className="w-full"
      />
      {showModal && <Model />}
    </div>
  );
}

const mapStateToProps = state => {
  const products = state.cart.cart.map(item => ({
    productId: item.product._id,
    quantity: item.quantity,
    sellerId: item.product.seller,
    storeId: item.product.store,
    userId: state.user.user._id,
    price: (item.product.price + item.product.shippingPrice) * item.quantity,
  }));
  console.log("Products--------", products);
  return {
    seller: state.seller,
    userId: state.user.user._id,
    shippingAddress: state.cart.shipping._id,
    paymentMethod: state.cart.payment,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: async userId => {
      console.log("Emptying Cart------");
      const { data } = await Axios.delete(`${url}/cart/emptyCart/${userId}`);
      console.log("Data of empty cart-----", data);
      dispatch({ type: EMPTY_CART });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StripePayment);
