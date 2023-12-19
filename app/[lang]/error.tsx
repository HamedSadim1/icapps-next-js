"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded shadow-md">
    <div className="text-center">
      <p className="text-2xl font-bold text-red-500 mb-4">{error.message}</p>
      <p className="text-gray-600 mb-8">Opnieuw proberen</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => reset()}>
        Opnieuw proberen
      </button>
    </div>
  </div>
</div>
  );
};

export default ErrorPage;
