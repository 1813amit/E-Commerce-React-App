import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineHome } from "react-icons/ai";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="p-4 text-gray-600">Loading product...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Link
        to="/"
        className="text-blue-600 flex items-center mb-6 hover:underline"
      >
        <AiOutlineHome className="mr-2 text-xl" /> Back to products
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden"
      >
        {/* Image Section */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="md:w-2/5 w-full bg-gray-50 p-6 flex items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-72 object-contain rounded-lg"
          />
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="md:w-3/5 w-full p-6 space-y-4"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-1">
            <p className="text-xl font-semibold text-blue-600">
              ₹ {product.price}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Rating:</span>{" "}
              {product.rating?.rate} ★ ({product.rating?.count} reviews)
            </p>
          </div>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
