// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  const { _id, title, price_min, price_max, email, image } = product;

  const priceDisplay = `$${price_min} - ${price_max}`;

  return (
    <div className="border border-gray-200 p-2 shadow-sm bg-white rounded-lg transition duration-300 ease-in-out hover:shadow-md">
      <div className="w-full h-40 bg-gray-200 mb-3">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {/* Placeholder */}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-2">
        {/* Product Title */}
        <h3 className="text-base font-medium text-gray-800 h-10 overflow-hidden mb-1">
          {title}
        </h3>

        <p className="text-lg font-bold text-purple-600 mb-3 border-b border-dashed border-gray-200 pb-2">
          {priceDisplay}
        </p>

        {/* View Details Button */}
        <div className="w-full">
          <Link
            to={`/productDetails/${_id}`}
            className="block w-full py-2 text-sm font-semibold text-purple-600 border border-purple-300 rounded-md text-center hover:bg-purple-50 transition duration-150"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
