import React, { useState } from "react";
import "./products.css"
import ProductCard from "../productcard/productCard";

function Products({ products }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const categoryOptions = ["men", "women", "kids"];

  return (
    <div className="body-products">
      <div className="category-filter">
        <div className="box">
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
      </div>
      <div className="body-cards">
        <div className="grid-container">
          {filteredProducts.map((product) => (
            <ProductCard
              className="grid-item"
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
