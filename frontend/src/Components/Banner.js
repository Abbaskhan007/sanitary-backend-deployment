import Axios from "axios";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import url from "../Constants";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [counter, setCounter] = useState(0);
  const fetchBanners = async () => {
    const { data } = await Axios.get(`${url}/banners`);
    console.log("Data", data);
    setBanners(data);
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (counter % banners.length === 0) {
    return (
      <div className="relative">
        <motion.img
          initial={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-[100%] h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-fill mb-4"
          src={banners[0]?.image}
        />
        <div className="absolute left-[10%] top-[25%] z-20 space-y-12 mr-8 max-w-5xl">
          <h1 className="text-4xl font-semibold bg-black/50 px-6 py-3 text-white rounded-md inline-block">
            Payment Via Blockchain
          </h1>
          <h1 className="text-xl font-medium bg-black/50 px-4 py-2 text-white rounded-md ">
            Buy Quality products through Blockchain
          </h1>
        </div>
      </div>
    );
  }
  if (counter % banners.length === 1) {
    return (
      <div className="relative">
        <motion.img
          initial={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-[100%] h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-fill mb-4"
          src={banners[1]?.image}
        />
        <div className="absolute left-[10%] top-[25%] z-20 space-y-12 ">
          <h1 className="text-4xl font-semibold bg-black/50 px-6 py-3 text-white rounded-md inline-block">
            Search By Image
          </h1>
          <h1 className="text-xl font-medium bg-black/50 px-4 py-2 text-white rounded-md max-w-5xl">
            Search any produtct by image in Smart Sanitary
          </h1>
        </div>
      </div>
    );
  }
  if (counter % banners.length === 2) {
    return (
      <div className="relative">
        <motion.img
          initial={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
          animate={{ opacity: 1 }}
          className="w-[100%] h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-fill mb-4"
          src={banners[2]?.image}
        />
        <div className="absolute left-[10%] top-[25%] z-20 space-y-12 ">
          <h1 className="text-4xl font-semibold bg-black/50 px-6 py-3 text-white rounded-md inline-block">
            Buy and Sell Product
          </h1>
          <h1 className="text-xl font-medium bg-black/50 px-4 py-2 text-white rounded-md max-w-5xl">
            Buy any product you want and can sell products by creating an seller
            account
          </h1>
        </div>
      </div>
    );
  }
  if (counter % banners.length === 3) {
    return (
      <div className="relative">
        <motion.img
          initial={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
          animate={{ opacity: 1 }}
          className="w-[100%] h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] object-fill mb-4"
          src={banners[3]?.image}
        />
        <div className="absolute left-[10%] top-[25%] z-20 space-y-12 ">
          <h1 className="text-4xl font-semibold bg-black/50 px-6 py-3 text-white rounded-md inline-block">
            Augmented Reality
          </h1>
          <h1 className="text-xl font-medium bg-black/50 px-4 py-2 text-white rounded-md max-w-5xl">
            View any Sanitary Item in the real environment through Augmented
            Reality
          </h1>
        </div>
      </div>
    );
  }
}
