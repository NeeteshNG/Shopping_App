import React from "react";
import "./cart.css"
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/userSlice";
import { Link } from "react-router-dom";

function Cart() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const removeItem = (product) => {
    dispatch(removeFromCart(product));
  };

  const incrementItemQuantity = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const decrementItemQuantity = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const totalAmount = user && user.cart ? user.cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ) : 0;

  return (
    <div className="cart-body">
      <div className="cart-container">
        <h1>CART</h1>
        {user && user.cart && user.cart.map((product) => (
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
              onClick={() => removeItem(product)}
              className="cart-item-remove-button"
            >
              <i className="fa fa-trash-o"></i>
            </button>
            <div className="cart-item-quantity">
              <div className="quantity-buttons">
                <button onClick={() => decrementItemQuantity(product.id)}>
                  -
                </button>
                {product.quantity}
                <button onClick={() => incrementItemQuantity(product.id)}>
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
