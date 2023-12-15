import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../UserAuth/Redux_User/userSlice";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../UserAuth/Redux_User/userSlice";

function ProductCard({ product }) {
  const { id, name, price, description, images } = product;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.user.user?.wishlist || []);
  const [isInWishlist, setIsInWishlist] = useState(wishlist.some(item => item.id === product.id));  

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
    setShowModal(!showModal);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <img src={images} alt={name} />
      </Link>
      <div className={`wishlist-button ${isInWishlist ? 'filled' : ''}`} onClick={toggleWishlist}>
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
      {showModal && <ProductDetails product={product} onClose={handleToggle} />}
    </div>
  );
}

export default ProductCard;
