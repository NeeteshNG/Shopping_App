import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../Redux/listSlice";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id, name, price, description, images } = product;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`}>
        <img src={images} alt={name} />
      </Link>
      <h2>{name}</h2>
      <p>{description.slice(0, 40)}...</p>
      <p>Price : {price} /-</p>
      <button onClick={handleAddToCart}>
        <i className="fa fa-cart-plus"></i>
      </button>
      <button onClick={handleAddToWishlist}>
        <i className="fa fa-heart-o"></i>
      </button>
      <button onClick={handleToggle}>
        <i className="fa fa-info-circle"></i>
      </button>
      {showModal && <ProductDetails product={product} onClose={handleToggle} />}
    </div>
  );
}

export default ProductCard;
