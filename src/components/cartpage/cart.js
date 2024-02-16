import React, { useEffect, useState } from "react";
import "./cart.css"
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../Redux/userSlice";
import { Link } from "react-router-dom";

function Cart({ products }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const [userCartInfo, setUserCartInfo] = useState([]);
  const [userCartProducts, setUserCartProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          "http://127.0.0.1:8000/cartApi/cart-items/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const userCartProductsInfo = data
        setUserCartInfo(data)

        const authUserIdInfo = userCartProductsInfo.filter((id_of) => (
          id_of.user === user.id
        ))
        
        const filteredProducts = authUserIdInfo.map((info) => {
          const product = products.find((item) => item.id === info.product);
          if (product) {
            return { ...product, quantity: info.quantity };
          }
          return null;
        }).filter(Boolean);
          
        setUserCartProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const removeItem = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/?product=${product.id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart item");
      }
      const data = await response.json();
      const cartItemId = data[0].id;
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

      const updatedCart = userCartProducts.filter(item => item.id !== product.id);
      setUserCartProducts(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  
  const incrementItemQuantity = ( productId) => {
    try {
      const filteredProductInfo = userCartInfo.filter((info) => (
        info.product === productId
      ))
      const cartItemId = filteredProductInfo[0].id
      const token = localStorage.getItem('token'); 

      const incrementResponse = fetch(
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
