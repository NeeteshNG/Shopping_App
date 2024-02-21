import React from 'react'
import './productCard.css'
import { Link, useNavigate } from 'react-router-dom'

function ProductCard ({ product, toggleWishlist, userWishlistProducts, handleAddToCart }) {
  const { id, name, price, description, images } = product
  const navigate = useNavigate()
  const isInWishlist = userWishlistProducts.some(item => item.id === product.id)

  const handleToggle = () => {
    navigate(`/products/${id}`)
  }

  return (
    <div className='product-card'>
      <Link to={`/products/${id}`}>
        {images.length > 0 && <img src={images[0].image} alt={`${name}`} />}
      </Link>
      <div
        className={`wishlist-button ${isInWishlist ? 'filled' : ''}`}
        onClick={() => toggleWishlist(product)}
      >
        <i className='fa fa-heart'></i>
      </div>
      <h2>{name}</h2>
      <p>{description.slice(0, 40)}...</p>
      <p>Price : {price} /-</p>
      <button onClick={() => handleAddToCart(product)}>
        <i className='fa fa-cart-plus'></i>
      </button>
      <button onClick={handleToggle}>
        <i className='fa fa-info-circle'></i>
      </button>
    </div>
  )
}

export default ProductCard
