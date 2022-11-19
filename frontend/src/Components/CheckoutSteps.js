import React from "react";

export default function CheckoutSteps({ step = 1 }) {
  return (
    <div className="grid grid-cols-4  sm:gap-4 gap-2 my-8">
      <div
        className={`border-t-4 text-center p-1 font-semibold sm:text-base text-sm ${
          step >= 1 ? "border-violet-500" : "border-gray-300"
        }`}
      >
        Sign-In
      </div>
      <div
        className={`border-t-4 text-center p-1 font-semibold sm:text-base text-sm ${
          step >= 2 ? "border-violet-500" : "border-gray-300"
        }`}
      >
        Shipping
      </div>
      <div
        className={`border-t-4 text-center p-1 font-semibold sm:text-base text-sm ${
          step >= 3 ? "border-violet-500" : "border-gray-300"
        }`}
      >
        Payment
      </div>
      <div
        className={`border-t-4 text-center p-1 font-semibold sm:text-base text-sm ${
          step >= 4 ? "border-violet-500" : "border-gray-300"
        }`}
      >
        Place Order
      </div>
    </div>
  );
}
