import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Slider(props) {
  const images = props.images
    ? props.images
    : [
        "https://image.made-in-china.com/2f0j00ivFELzrGsyYg/Wholesale-Best-Price-Wash-Basin-Pedestal-Prices.jpg",
        "http://mobileimages.lowes.com/productimages/365a050a-ee4b-4098-8e25-22cdb2c67aed/16414656.jpg",
        "https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzFvT0Q5a0dmNUwuX0FDX1NMMTUwMF8uanBn.jpg",
        "https://myvolco.com/wp-content/uploads/2021/02/table-top-wall-mounted-wash-basin-white-18-x-12-x-5-inch-glossy-original-imafhe8ydba2jyyk.jpeg",
        "http://mobileimages.lowes.com/productimages/365a050a-ee4b-4098-8e25-22cdb2c67aed/16414656.jpg",
      ];
  const [mainImage, setMainImage] = useState(0);
  console.log("MAin", mainImage);
  const sliderHandler = num => {
    console.log("Num: ", num);
    if (num === 1 && mainImage + num < images.length) {
      setMainImage(mainImage + num);
    } else if (num === 1 && mainImage + num >= images.length) {
      setMainImage(0);
    } else if (num === -1 && mainImage + num >= 0) {
      setMainImage(mainImage + num);
    } else if (num === -1 && mainImage + num < 0) {
      setMainImage(images.length - 1);
    }
  };
  return (
    <div>
      <div className="flex items-center relative  mb-8">
        <AiOutlineLeft
          className="text-5xl absolute  text-gray-400 font-thin cursor-pointer"
          onClick={() => sliderHandler(-1)}
        />
        <img
          className="transition ease-in-out-400 duration:400 object-contain max-h-[500px] mx-auto"
          src={images[mainImage].url || images[mainImage]}
        />
        <AiOutlineRight
          className="text-5xl absolute right-4  text-gray-400 font-thin cursor-pointer"
          onClick={() => sliderHandler(1)}
        />
      </div>
      <div className="flex space-x-3 justify-center items-center">
        {images.map((image, index) => (
          <img
            onClick={() => setMainImage(index)}
            className={`w-12 h-12 border  border-gray-100 shadow-md cursor-pointer transition hover:scale-105 ease-in-out-400 duration: 400 rounded ${
              mainImage === index ? "scale-105 border-violet-500 p-1" : null
            }`}
            src={image.url || image}
          />
        ))}
      </div>
    </div>
  );
}
