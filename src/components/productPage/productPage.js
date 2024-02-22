import React from 'react'
import './productPage.css'
import { useParams } from 'react-router-dom'

function ProductPage ({
  products,
  handleAddToCart,
  toggleWishlist,
  quantity,
  handleIncrement,
  handleDecrement,
  selectedImageIndex,
  setSelectedImageIndex
}) {
  const { productId } = useParams()
  const product = products.find(product => product.id === Number(productId))

  // const [isInWishlist, setIsInWishlist] = useState(
  //   wishlist.some((item) => item.id === product.id)
  // );

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className='content-body'>
      <div className='product-page'>
        <div className='product-images'>
          <div className='thumbnail-images'>
            {product.images.map((item, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  index === selectedImageIndex ? 'selected' : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={item.image} alt={product.name} />
              </div>
            ))}
          </div>
          <div className='main-image'>
            <img
              src={product.images[selectedImageIndex].image}
              alt={product.name}
            />
          </div>
        </div>
        <div className='product-details'>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}/-</p>
          <p>Shipping Details: {product.shippingDetails}</p>
          <div className='quantity-control'>
            <button onClick={handleDecrement}>-</button>
            <input type='text' value={quantity} readOnly />
            <button onClick={() => handleIncrement(product)}>+</button>
          </div>
          <button
            className='add-to-cart-button'
            onClick={() => handleAddToCart(product, quantity)}
          >
            Add to Cart
          </button>
          <button
            className='add-to-wishlist-button'
            onClick={() => toggleWishlist(product)}
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage