import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addToCart,
  removeFromWishlist,
  addToWishlist,
} from "../UserAuth/Redux_User/userSlice";
import { useDispatch } from "react-redux";

function ProductPage({ products }) {
  const { productId } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const product = products.find((product) => product.id === Number(productId));

  const wishlist = useSelector((state) => state.user.user?.wishlist || []);
  const [isInWishlist, setIsInWishlist] = useState(
    wishlist.some((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
    setIsInWishlist(!isInWishlist);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      alert(
        `Maximum available quantity for ${product.name} is ${product.stock}`
      );
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
          <div className="quantity-control">
            <button onClick={handleDecrement}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="add-to-wishlist-button" onClick={toggleWishlist}>
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
