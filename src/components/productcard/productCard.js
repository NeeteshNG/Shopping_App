import React, { useState } from "react";
import "./productCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../../Redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeFromWishlist } from "../../Redux/userSlice";

function ProductCard({ product }) {
  const { id, name, price, description, images } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.user.user?.wishlist || []);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggle = () => {
    navigate(`/products/${id}`)
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        {images.length > 0 && (
          <img
            src={images[0].image}
            alt={`${name}`}
          />
        )}
      </Link>
      <div
        className={`wishlist-button ${isInWishlist ? "filled" : ""}`}
        onClick={toggleWishlist}
      >
        <i className="fa fa-heart"></i>
      </div>
      <h2>{name}</h2>
      <p>{description.slice(0, 40)}...</p>
      <p>Price : {price} /-</p>
      <button onClick={handleAddToCart}>
        <i className="fa fa-cart-plus"></i>
      </button>
      <button onClick={handleToggle}>
        <i className="fa fa-info-circle"></i>
      </button>
    </div>
  );
}

export default ProductCard;
