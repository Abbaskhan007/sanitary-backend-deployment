import React from "react";

export default function ErrorBox({ message, variant }) {
  return (
    <div
      className={`flex flex-1 py-2 px-4 rounded-md text-md font-semibold my-4 ${
        variant === "fail"
          ? "bg-red-200 text-red-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      {message}
    </div>
  );
}
