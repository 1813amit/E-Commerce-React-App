import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-lg transition border border-[#F7F5F7]  relative ">
      {/* Like Button */}
      <button
        onClick={() => setLiked(!liked)}
        className={`absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center  ${
          liked ? "text-red-500" : "text-gray-500"
        } hover:text-red-500 transition-colors`}
      >
        {liked ? (
          <Heart fill="currentColor" className="w-5 h-5" />
        ) : (
          <Heart className="w-5 h-5" />
        )}
      </button>

      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="block">
        {/* ✅ Image container with custom background */}
        <div
          className="w-full h-48 flex items-center justify-center mb-3 rounded-md"
          style={{ backgroundColor: "#F7F5F7" }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain p-2"
            style={{ backgroundColor: "#F7F5F7" }}
          />
        </div>

        {/* Title */}
        <h2 className="text-[16px] font-normal mb-1 px-4 text-[#667085]">
          {product.title}
        </h2>

        {/* Description */}
        <p className="text-[14px] text-[#7B7F86] mb-2 line-clamp-2 px-4">
          {product.description}
        </p>

        {/* Price */}
        <div className="font-bold text-black text-[20px] mb-1 px-4">
          ₹ {product.price.toFixed(2)}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-1 px-4">
          <span className="text-yellow-400 text-[24px]">
            {"★".repeat(Math.floor(product.rating?.rate || 0))}
            {"☆".repeat(5 - Math.floor(product.rating?.rate || 0))}
          </span>
          <span className="text-gray-500 text-sm ml-1">
            ({product.rating?.count || 0})
          </span>
        </div>
      </Link>
    </div>
  );
}
