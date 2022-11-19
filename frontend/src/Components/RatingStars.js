import React from "react";
import { IoStarHalfSharp, IoStarOutline, IoStarSharp } from "react-icons/io5";

export default function RatingStars({ rating,  }) {
  if (rating < 0.5) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarOutline className="text-yellow-400 text-lg"  />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 1) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarHalfSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 1.5) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 2) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarHalfSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 2.5) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 3) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarHalfSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 3.5) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 4) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarHalfSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 4.5) {
    return (
      <div className="flex flex-row -ml-1">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarOutline className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating < 5) {
    return (
      <div className="flex flex-row">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarHalfSharp className="text-yellow-400 text-lg" />
      </div>
    );
  } else if (rating == 5) {
    return (
      <div className="flex flex-row">
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
        <IoStarSharp className="text-yellow-400 text-lg" />
      </div>
    );
  }
}
