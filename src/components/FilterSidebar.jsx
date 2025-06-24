import React, { useState, useEffect } from "react";

function Star({ filled }) {
  return (
    <svg
      className={`w-5 h-5 ${
        filled ? "text-yellow-400" : "text-gray-300"
      } inline-block`}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
    </svg>
  );
}

export default function FilterSidebar({ onFilterChange, allProducts = [] }) {
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedRating, setSelectedRating] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const ratingStars = [5, 4, 3, 2, 1];

  useEffect(() => {
    async function fetchData() {
      const [catRes, productRes] = await Promise.all([
        fetch("https://fakestoreapi.com/products/categories").then((res) =>
          res.json()
        ),
        fetch("https://fakestoreapi.com/products").then((res) => res.json()),
      ]);

      setCategories(catRes);

      // Calculate review count per category
      const counts = {};
      productRes.forEach((product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
      });
      setCategoryCounts(counts);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      const prices = allProducts.map((p) => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange([min, max]);
      setMaxPrice(max);
    }
  }, [allProducts]);

  useEffect(() => {
    onFilterChange?.({
      category: selectedCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      rating: selectedRating,
      title: searchTitle,
    });
  }, [selectedCategory, priceRange, selectedRating, searchTitle]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderHistogram = () => {
    const bars = 10;
    const barStep = maxPrice / bars;

    return (
      <div className="flex items-end justify-center space-x-1 h-20 mb-4">
        {Array.from({ length: bars }).map((_, i) => {
          const stepMin = i * barStep;
          const stepMax = stepMin + barStep;
          const isFilled = priceRange[1] >= stepMin && priceRange[0] <= stepMax;
          const height = Math.floor(30 + Math.random() * 60);
          return (
            <div
              key={i}
              className={`w-2 rounded-sm ${
                isFilled ? "bg-blue-500" : "bg-blue-200"
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-xs h-fit rounded-xl shadow-lg p-5 bg-gray-100 font-sans select-none">
      <div className="flex justify-between mb-4 text-sm font-medium text-gray-900">
        <span>Filter</span>
        <span className="text-gray-600 cursor-pointer">Advanced</span>
      </div>

      {/* Category Section */}

      <section className="mb-5 bg-white p-2 rounded-lg">
        <button
          className="flex justify-between w-full mb-2 text-md font-semibold text-gray-900"
          onClick={() => toggleSection("category")}
        >
          <span>Category</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              expandedSections.category ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="mb-1">
          <input
            type="search"
            placeholder="Search title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded-md border border-gray-200 bg-gray-50"
          />
        </div>

        {expandedSections.category && (
          <ul>
            {categories.map((category) => (
              <li
                key={category}
                className="flex justify-between items-center px-2 py-2 rounded-md cursor-pointer capitalize hover:bg-gray-100"
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === category ? "" : category
                  )
                }
              >
                <span
                  className={`text-sm ${
                    selectedCategory === category
                      ? "text-blue-600 font-semibold"
                      : "text-gray-900"
                  }`}
                >
                  {category}
                  <span className="ml-2 text-gray-500">
                    {categoryCounts[category] || 0}
                  </span>
                </span>

                {/* ✅ Tick if selected */}
                {selectedCategory === category && (
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Price Section */}
      <section className="mb-5 bg-white p-4 rounded-lg shadow-sm">
        <button
          className="flex justify-between w-full mb-4 text-md font-semibold text-gray-900"
          onClick={() => toggleSection("price")}
        >
          <span>Price</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              expandedSections.price ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.price && (
          <>
            {renderHistogram()}
            <div className="relative h-2 bg-gray-100 rounded-full mb-4">
              <div
                className="absolute h-full bg-blue-600 rounded-full"
                style={{
                  left: `${(priceRange[0] / maxPrice) * 100}%`,
                  width: `${
                    ((priceRange[1] - priceRange[0]) / maxPrice) * 100
                  }%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    Math.min(Number(e.target.value), priceRange[1]),
                    priceRange[1],
                  ])
                }
                className="absolute top-[-6px] w-full appearance-none bg-transparent z-10"
              />
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Math.max(Number(e.target.value), priceRange[0]),
                  ])
                }
                className="absolute top-[-6px] w-full appearance-none bg-transparent z-10"
              />
            </div>
            <div className="flex justify-between">
              <input
                type="number"
                min="0"
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    Math.min(Number(e.target.value), priceRange[1]),
                    priceRange[1],
                  ])
                }
                className="w-[48%] bg-white border border-gray-300 rounded-md text-sm text-center py-1 font-semibold"
              />
              <input
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Math.max(Number(e.target.value), priceRange[0]),
                  ])
                }
                className="w-[48%] bg-white border border-gray-300 rounded-md text-sm text-center py-1 font-semibold"
              />
            </div>
          </>
        )}
      </section>

      {/* Rating Section */}
      <section className="mb-5 bg-white p-2 rounded-lg">
        <button
          className="flex justify-between w-full mb-2 text-md font-semibold text-gray-900"
          onClick={() => toggleSection("rating")}
        >
          <span>Rating</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              expandedSections.rating ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedSections.rating && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {ratingStars.map((starCount) => (
              <div
                key={starCount}
                className="flex space-x-1 cursor-pointer border border-gray-300 rounded-md p-2 hover:border-blue-400 transition"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} filled={i < starCount} />
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
