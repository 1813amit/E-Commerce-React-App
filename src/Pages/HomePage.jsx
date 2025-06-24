import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Price from "../components/background";
import { FiServer } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    rating: null,
    title: "",
  });
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      setFiltered(res.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, title: searchTitle }));
  }, [searchTitle]);

  useEffect(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.title) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    result = result.filter(
      (product) =>
        product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    if (filters.rating) {
      result = result.filter(
        (product) => Math.floor(product.rating?.rate || 0) === filters.rating
      );
    }

    if (sort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
    setPage(1);
  }, [filters, sort, products]);

  const paginatedProducts = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchTitle={searchTitle} setSearchTitle={setSearchTitle} />

      <Price />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="hidden md:block text-sm text-gray-500 mb-4">
          <span className="text-blue-500">Home</span> &gt; Clothes
        </div>

        <div className="flex gap-6 relative">
          {/* Responsive Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full z-40 w-3/4 max-w-xs transform transition-transform duration-300 overflow-y-auto
    bg-white shadow-lg p-4
    md:relative md:translate-x-0 md:w-1/4 md:block
    md:bg-transparent md:shadow-none md:p-0
    ${showFilter ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Close button inside sidebar (mobile only) */}
            <div className="flex justify-end mb-4 md:hidden">
              <button
                className="text-gray-600 border px-2 py-1 rounded"
                onClick={() => setShowFilter(false)}
              >
                Close
              </button>
            </div>
            <FilterSidebar onFilterChange={setFilters} allProducts={products} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 border-b border-gray-300 pb-2 space-y-3 md:space-y-0">
              <div className="relative flex justify-end gap-[5px] md:justify-between md:gap-0 items-center w-full">
                {/* Chevron icon removed here, now used for opening only */}

                <div className="absolute left-0 md:hidden">
                  <button onClick={() => setShowFilter(true)}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-gray-700 bg-gray-100 rounded-lg px-3 py-2 ml-3">
                  <FiServer className="w-[15px] h-[15px]" />
                  <HiOutlineAdjustmentsHorizontal className="w-[25px] h-[25px] text-black" />
                </div>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className=" bg-gray-100 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sort by :</option>
                  <option value="asc">Sort by: Low to High</option>
                  <option value="desc">Sort by: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-6 bg-white">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={Math.ceil(filtered.length / itemsPerPage)}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
