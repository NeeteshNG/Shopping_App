import React from 'react'
import { Box, IconButton } from '@mui/material'
import SlidingPage from '../slidingpage/slidingpage'
import ProductCard from '../productcard/productCard'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function Home ({
  products,
  handleSlide,
  currentIndex,
  fetchCartProducts,
  toggleWishlist,
  userWishlistProducts,
  handleAddToCart
}) {
  const visibleProducts = products.slice(currentIndex, currentIndex + 4)
  return (
    <Box style={homeStyles.homePage}>
      <SlidingPage />
      <Box style={homeStyles.catalogContainer}>
        <Box style={homeStyles.productsRow}>
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              fetchCartProducts={fetchCartProducts}
              toggleWishlist={toggleWishlist}
              userWishlistProducts={userWishlistProducts}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Box>
        <Box style={homeStyles.sliderControls}>
          <IconButton 
            sx={homeStyles.prevNextButton} 
            onClick={() => handleSlide('prev')}
          ><ArrowCircleLeftIcon/></IconButton>
          <IconButton 
            sx={homeStyles.prevNextButton} 
            onClick={() => handleSlide('next')}
          ><ArrowCircleRightIcon/></IconButton>
        </Box>
      </Box>
    </Box>
  )
}

const homeStyles = {
  homePage: {
    marginTop: '70px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  catalogContainer: {
    marginTop: '50px',
    justifyContent: 'center',
    margin: '35px'
  },
  productsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    overflowX: 'hidden'
  },
  homeProductCard: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    position: 'relative',
    width: '250px',
    display: 'inline-block',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  productImage: {
    height: '240px',
    width: '240px',
    objectFit: 'cover'
  },
  sliderControls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '10px'
  },
  prevNextButton: {
    color: 'white',
    backgroundColor: '#144981',
    '&:hover': {
      backgroundColor: 'white',
      color: '#144981'
    }
  },
}

export default Home
