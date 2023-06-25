import React from "react";

function Button({ text, glassMorphism, disabled }) {
  return (
    <button
      disabled={disabled ? true : false}
      className={`flex justify-center rounded-md border border-2 border-gray-900 bg-gray-900  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${
        glassMorphism
          ? "backdrop bg-opacity-5 backdrop-filter backdrop-blur-lg text-slate-900"
          : "text-white"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {text}
    </button>
  );
}

export default Button;
