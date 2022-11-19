import React from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

export default function PriceSlider({ min, max, value, setValue, worker }) {
  return (
    <div className=" my-10">
      <p className="text-2xl mb-8 text-gray-600 text-center">
        Price Slider {worker && <span className="text-sm font-medium">(Rs / hour)</span>}
      </p>
      <InputRange
        maxValue={max}
        minValue={min}
        value={value}
        onChange={value => setValue(value)}
      />
    </div>
  );
}
