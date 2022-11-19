import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function WorkerCard({ worker }) {
  return (
    <Link
      to={`/workers/${worker._id}`}
      className="border-2 border-gray-200 shadow-lg rounded-lg cursor-pointer transition hover:scale-105 ease-in-out duration-300 delay-100 overflow-hidden flex flex-col"
    >
      <img className="flex-1 object-cover max-h-[250px]" src={worker.images[0]} />
      <div className="p-2 px-4">
        <p className="text-lg font-semibold my-1">{worker.category[0]}</p>
        <p className="text-md font-medium">Rs. {worker.price}</p>
        <div className="flex items-center space-x-2">
          <RatingStars numRating={worker.numRating} rating={worker.rating} />
          <p className="text-gray-400 text-sm">({worker.numRating})</p>
        </div>
      </div>
    </Link>
  );
}
