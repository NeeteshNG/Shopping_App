import React, { useEffect, useState } from "react";
import "./cart.css"
import { Link } from "react-router-dom";

function Cart
  ({ 
    fetchCartProducts, 
    userCartProducts, 
    removeItem, 
    incrementQuantity, 
    decrementQuantity, 
    totalAmount
  }) {

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="content-body">
      <div className="cart-container">
        <h1>CART</h1>
        {userCartProducts && userCartProducts.length > 0 && userCartProducts.map((product) => (
          <div key={product.id} className="cart-item">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.images[0].image}
                alt={product.name}
                className="cart-item-image"
              />
            </Link>
            <div className="cart-item-details">
              <h2 className="cart-item-name">{product.name}</h2>
              <p className="cart-item-description">
                {product.description.slice(0, 60)}
              </p>
              <p className="cart-item-price">Price: {product.price}/-</p>
            </div>
            <button
              onClick={() => removeItem(product.id)}
              className="cart-item-remove-button"
            >
              <i className="fa fa-trash-o"></i>
            </button>
            <div className="cart-item-quantity">
              <div className="quantity-buttons">
                <button onClick={() => decrementQuantity(product.id)}>
                  -
                </button>
                {product.quantity}
                <button onClick={() => incrementQuantity(product.id)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <h2 className="total-amount">Total: {totalAmount}/-</h2>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
