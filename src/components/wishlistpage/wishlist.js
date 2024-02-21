import React from "react";
import "./wishlist.css"
import { Link } from "react-router-dom";

function Wishlist({ products, toggleWishlist }) {
  return (
    <div className="content-body">
      <div className="wishlist-container">
        <h1 className="wishlist-title">Wishlist</h1>
        {products && products.length > 0 ? (
          <div className="wishlist-items">
            {products.map((product) => (
              <div key={product.id} className="wishlist-item">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.images[0].image}
                    alt={product.name}
                    className="wishlist-item-image"
                  />
                </Link>
                <div className="wishlist-item-details">
                  <h2
                    className="wishlist-item-name"
                  >
                    {product.name}
                  </h2>
                  <p className="wishlist-item-description">
                    {product.description.slice(0, 60)}
                  </p>
                  <p className="wishlist-item-price">
                    Price: {product.price}/-
                  </p>
                </div>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="wishlist-item-remove-button"
                >
                  <i className="gg-remove"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-wishlist-message">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
