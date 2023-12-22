import React, { useState } from "react";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../../Redux/userSlice";
import axios from "axios";

function ProductCard({ product }) {
  const { id, name, price, description, images } = product;
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.user.user?.wishlist || []);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  const toggleWishlist = (product) => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      if (userData && userData.id) {
        axios
          .post("http://127.0.0.1:8000/wishlistApi/wishlist-items/", {
            product: product.id,
            user: userData.id,
          })
          .then((response) => {
            console.log("Item added to wishlist on the server:", response.data);
          })
          .catch((error) => {
            console.error("Error adding item to wishlist:", error);
          });
      } else {
        console.error("User data not available");
      }
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleAddToCart = (product) => {
      if (userData && userData.id) {
        axios
          .post("http://127.0.0.1:8000/cartApi/cart-items/", {
            product: product.id,
            user: userData.id,
          })
          .then((response) => {
            console.log("Item added to cart on the server:", response.data);
          })
          .catch((error) => {
            console.error("Error adding item to cart:", error);
          });
      } else {
        console.error("User data not available");
      }
  };

  const handleToggle = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        {images.length > 0 && <img src={images[0].image} alt={`${name}`} />}
      </Link>
      <div
        className={`wishlist-button ${isInWishlist ? "filled" : ""}`}
        onClick={() => toggleWishlist(product)}
      >
        <i className="fa fa-heart"></i>
      </div>
      <h2>{name}</h2>
      <p>{description.slice(0, 40)}...</p>
      <p>Price : {price} /-</p>
      <button onClick={() => handleAddToCart(product)}>
        <i className="fa fa-cart-plus"></i>
      </button>
      <button onClick={handleToggle}>
        <i className="fa fa-info-circle"></i>
      </button>
    </div>
  );
}

export default ProductCard;
