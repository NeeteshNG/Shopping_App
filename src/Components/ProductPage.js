// ProductPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductPage({ products }) {
  const { productId } = useParams();
  const product = products.find((product) => product.id === Number(productId));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="page-body">
      <div className="product-page">
        <div className="product-images">
          <div className="thumbnail-images">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  index === selectedImageIndex ? "selected" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={image} alt={product.name} />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={product.images[selectedImageIndex]} alt={product.name} />
          </div>
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}/-</p>
          <p>Shipping Details: {product.shippingDetails}</p>
          <button className="add-to-cart-button">Add to Cart</button>
          <button className="add-to-wishlist-button">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
