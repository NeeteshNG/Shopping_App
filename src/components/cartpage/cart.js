import React, { useEffect, useState } from "react";
import "./cart.css"
import { Link } from "react-router-dom";

function Cart(
    { 
      fetchCartProducts, userCartInfo, userCartProducts, setUserCartProducts 
    }
  ) {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const removeItem = async (productId) => {
    try {
      const filteredProductInfo = userCartInfo.filter((info) => (
        info.product === productId
      ))
      const token = localStorage.getItem('token');
      const cartItemId = filteredProductInfo[0].id

      const deleteResponse = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete cart item");
      }

      const updatedCart = userCartProducts.filter(item => item.id !== productId);
      setUserCartProducts(updatedCart);
      fetchCartProducts();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const incrementItemQuantity = async (productId) => {
    try {
      const filteredProductInfo = userCartInfo.filter((info) => (
        info.product === productId
      ))
      const cartItemId = filteredProductInfo[0].id
      const token = localStorage.getItem('token');

      const incrementResponse = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/increment/`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...filteredProductInfo, quantity: filteredProductInfo[0].quantity + 1 }),
        }
      );

      if (!incrementResponse.ok) {
        throw new Error("Failed to update cart item quantity");
      }

      const updatedCart = userCartProducts.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setUserCartProducts(updatedCart);
    } catch (error) {
      console.error("Error incrementing item quantity:", error);
    }
  };

  const decrementItemQuantity = async (productId) => {
    try {
      const filteredProductInfo = userCartInfo.filter((info) => (
        info.product === productId
      ))
      const cartItemId = filteredProductInfo[0].id
      const token = localStorage.getItem('token');

      if (filteredProductInfo[0].quantity === 1) {
        return removeItem(productId);
      }

      const decrementResponse = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/decrement/`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...filteredProductInfo, quantity: filteredProductInfo[0].quantity - 1 }),
        }
      );

      if (!decrementResponse.ok) {
        throw new Error("Failed to update cart item quantity");
      }

      const updatedCart = userCartProducts.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setUserCartProducts(updatedCart);
      fetchCartProducts();
    } catch (error) {
      console.error("Error decrementing item quantity:", error);
    }
  };

  const totalAmount = userCartProducts && userCartProducts.length > 0 ? userCartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ) : 0;

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
