import React, { useState } from "react";
import "./products.css";
import ProductCard from "../productcard/productCard";

function Products({ products, fetchCartProducts }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSelectedSorting(event.target.value);
  };

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (selectedSorting === "price_low_to_high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSorting === "price_high_to_low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const categoryOptions = ["men", "women", "kids"];
  const sortingOptions = [
    { label: "L -- H", value: "price_low_to_high" },
    { label: "H -- L", value: "price_high_to_low" },
  ];

  return (
    <div className="content-body">
      <div className="products-body">
        <div className="filter-section">
          <div className="filter-box">
            <label className="filter-text" htmlFor="category">
              FILTER BY CATEGORY :{" "}
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-box">
            <label className="filter-text" htmlFor="sorting">
              SORT BY PRICE:{" "}
            </label>
            <select
              id="sorting"
              value={selectedSorting}
              onChange={handleSortingChange}
            >
              {sortingOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="body-cards">
          <div className="grid-container">
            {filteredProducts.map((product) => (
              <ProductCard
                className="grid-item"
                key={product.id}
                product={product}
                fetchCartProducts={fetchCartProducts}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
