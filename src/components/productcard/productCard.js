import React, { useState } from 'react'
import './productCard.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ProductCard ({ product, fetchCartProducts, toggleWishlist, isInWishlist }) {
  const { id, name, price, description, images } = product
  const userData = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()

  const handleAddToCart = product => {
    if (userData && userData.id) {
      const token = localStorage.getItem('token')
      axios
        .post(
          'http://127.0.0.1:8000/cartApi/add-to-cart/',
          {
            product: product.id,
            user: userData.id
          },
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        .then(response => {
          console.log('Item added to cart on the server:', response.data)
          fetchCartProducts()
        })
        .catch(error => {
          console.error('Error adding item to cart:', error)
        })
    } else {
      console.error('User data not available')
    }
  }

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
