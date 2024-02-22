import React from 'react'
import SlidingPage from '../slidingpage/slidingpage'
import '../homepage/home.css'

function Home ({ products, handleSlide, currentIndex }) {
  const visibleProducts = products.slice(currentIndex, currentIndex + 4)
  return (
    <div className='home-page'>
      <SlidingPage />
      <div className='catalog-container'>
        <div className='products-row'>
          {visibleProducts.map((product, index) => (
            <div key={index} className='home-product-card'>
              <img src={product.images[0].image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description.slice(0, 50)}...</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
        <div className='slider-controls'>
          <button onClick={() => handleSlide('prev')}>&#8249;</button>
          <button onClick={() => handleSlide('next')}>&#8250;</button>
        </div>
      </div>
    </div>
  )
}

export default Home
