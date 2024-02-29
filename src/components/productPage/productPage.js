import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography, CardMedia, IconButton } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

function ProductPage ({
  products,
  handleAddToCart,
  toggleWishlist,
  quantity,
  handleIncrement,
  handleDecrement,
  selectedImageIndex,
  setSelectedImageIndex,
  userWishlistProducts
}) {
  const { productId } = useParams()
  const product = products.find(product => product.id === Number(productId))
  const isInWishlist = userWishlistProducts.some(item => item.id === product.id);

  if (!product) {
    return <Box>Product not found</Box>
  }

  return (
    <Box style={productStyles.productPage}>
      <Box style={productStyles.productImages}>
        <Box style={productStyles.thumbnailImages}>
          {product.images.map((item, index) => (
            <Box
              key={index}
              style={{
                ...productStyles.thumbnail,
                border:
                  index === selectedImageIndex ? '2px solid #007bff' : 'none'
              }}
              onClick={() => setSelectedImageIndex(index)}
            >
              <CardMedia
                component='img'
                image={item.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
        <Box style={productStyles.mainImage}>
          <CardMedia
            component='img'
            image={product.images[selectedImageIndex].image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Box>
      <Box style={productStyles.productDetails}>
        <Typography variant='h4'>{product.name}</Typography>
        <Typography variant='body1' style={productStyles.description}>
          {product.description}
        </Typography>
        <Typography variant='body1'>Price: {product.price}/-</Typography>
        <Typography variant='body1'>
          Shipping Details: {product.shippingDetails}
        </Typography>
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Box style={productStyles.cartButtonsBox}>
            <Box style={productStyles.quantityControl}>
              <IconButton
                variant='contained'
                style={productStyles.quantityButton}
                onClick={handleDecrement}
              >
                <RemoveCircleOutline />
              </IconButton>
              <Box style={productStyles.quantityBox}>{quantity}</Box>
              <IconButton
                variant='contained'
                style={productStyles.quantityButton}
                onClick={() => handleIncrement(product)}
              >
                <AddCircleOutline />
              </IconButton>
            </Box>
            <Button
              variant='contained'
              style={productStyles.addToCartButton}
              onClick={() => handleAddToCart(product, quantity)}
            >
              Add to Cart
            </Button>
          </Box>
          <Box style={productStyles.wishlistButtonsBox}>
            <IconButton
              variant='contained'
              style={productStyles.addToWishlistButton}
              onClick={() => toggleWishlist(product)}
            >
              {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const productStyles = {
  productPage: {
    display: 'flex',
    margin: '70px auto 20px auto'
  },
  productImages: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px'
  },
  thumbnailImages: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  thumbnail: {
    width: '50px',
    height: '50px',
    margin: '5px',
    cursor: 'pointer',
    overflow: 'hidden'
  },
  mainImage: {
    width: '300px',
    height: '300px',
    marginLeft: '30px',
  },
  productDetails: {
    flex: 2,
    padding: '40px 15px',
    width: '50%'
  },
  addToCartButton: {
    backgroundColor: '#144981',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer'
  },
  addToWishlistButton: {
    backgroundColor: '#144981',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityButton: {
    border: 'none',
    color: '#144981',
    fontSize: '18px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 0.3s'
  },
  quantityBox: {
    width: '50px',
    textAlign: 'center',
    fontSize: '16px',
    margin: '20px',
    borderRadius: '4px',
    padding: '5px',
    outline: 'none'
  },
  description: {
    width: '40%',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    marginBottom: '10px'
  },
  cartButtonsBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    marginBottom: '20px'
  },
  wishlistButtonsBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '45px',
    marginLeft: '10px'
  },
}

export default ProductPage
