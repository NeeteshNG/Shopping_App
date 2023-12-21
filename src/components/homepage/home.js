import React from "react";
import SlidingPage from "../slidingpage/slidingpage";
import "../homepage/home.css";
import { useState } from "react";

function Home({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlide = (direction) => {
    const lastIndex = products.length - 1;
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
    } else {
      newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
    }

    setCurrentIndex(newIndex);
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 4);

  return (
    <div className="home-page">
      <SlidingPage />
      <div className="catalog-container">
        <div className="products-row">
          {visibleProducts.map((product, index) => (
            <div key={index} className="home-product-card">
              <img src={product.images[0].image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description.slice(0, 50)}...</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
        <div className="slider-controls">
          <button onClick={() => handleSlide("prev")}>&#8249;</button>
          <button onClick={() => handleSlide("next")}>&#8250;</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
