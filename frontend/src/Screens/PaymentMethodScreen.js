import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { SAVE_PAYMENT_METHOD } from "../Redux/Constants";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";

function PaymentMethodScreen({ user, savePaymentMethod }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name) {
      navigate("/login");
    }
  }, []);

  const onSubmitHandler = () => {
    savePaymentMethod(paymentMethod);
    navigate("/orderDetails");
  };

  return (
    <div className="sm:px-12 px-6">
      <CheckoutSteps className="px-12" step={3} />
      <div className="sm:w-[500px] -mt-12 min-h-[calc(100vh-180px)] flex flex-col  mx-auto items-center  justify-center">
        <p className="text-2xl font-semibold  mt-12 mb-8 text-center ">
          Payment Method
        </p>
        <div className="mb-2 self-center">
          <label className="font-semibold ">Bank Transfer</label>
          <img
            src="https://res.cloudinary.com/dlxyvl6sb/image/upload/v1660668034/sanitary-store/Screen_Shot_2022-08-16_at_8.33.09_PM_qfcrpp.png"
            className={`sm:w-[350px] h-[200px] cursor-pointer rounded-md shadow-md mb-8 mt-2 ${
              paymentMethod === "bank" &&
              "scale-110 ease-in-out delay-100 transition duration-500 mt-4" 
            } `}
            onClick={() => setPaymentMethod("bank")}
          />
        </div>
        <div className="mb-2">
          <label className="font-semibold ">Blockchain</label>
          <img
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/how_to_start_a_career_in_blockchain_technology.jpg"
            className={`sm:w-[350px] h-[200px] cursor-pointer rounded-md shadow-md my-2 ${
              paymentMethod === "blockchain" &&
              "scale-110 ease-in-out delay-100 transition duration-500 mt-4"
            }`}
            onClick={() => setPaymentMethod("blockchain")}
          />
        </div>
        <button
        disabled={!paymentMethod}
          onClick={onSubmitHandler}
          className={`{ cursor-pointer p-[6px] w-full text-center text-lg my-4 text-white ${paymentMethod? "bg-violet-500":"bg-gray-300 text-gray-600"} disabled:cursor-not-allowed  rounded-md font-semibold`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePaymentMethod: data => {
      dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodScreen);
