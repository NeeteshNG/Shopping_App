import React from 'react'
import { Box, CardMedia, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'

function Wishlist ({ products, toggleWishlist }) {
  return (
    <Box style={wishlistStyles.container}>
      <Box>
        <Typography variant='h4' style={wishlistStyles.title}>
          Wishlist
        </Typography>
      </Box>
      {products && products.length > 0 ? (
        <Box style={wishlistStyles.items}>
          {products.map(product => (
            <Box key={product.id} style={wishlistStyles.item}>
              <Link to={`/products/${product.id}`} style={wishlistStyles.imageBox}>
                <CardMedia
                  component='img'
                  image={product.images[0].image}
                  alt={product.name}
                  style={wishlistStyles.image}
                />
              </Link>
              <Box style={wishlistStyles.details}>
                <Typography variant='h6' style={wishlistStyles.name}>
                  {product.name}
                </Typography>
                <Typography variant='body1' style={wishlistStyles.description}>
                  {product.description}
                </Typography>
                <Typography variant='body1' style={wishlistStyles.price}>
                  Price: {product.price}/-
                </Typography>
              </Box>
              <IconButton
                onClick={() => toggleWishlist(product)}
                variant='contained'
                color='error'
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          variant='body1'
          align='center'
          style={wishlistStyles.emptyMessage}
        >
          Your wishlist is empty.
        </Typography>
      )}
    </Box>
  )
}

const wishlistStyles = {
  container: {
    padding: '20px',
    background: '#fff',
    border: '1px solid #e3e3e3',
    borderRadius: '5px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '100px 20px 40px 20px',
    height: '40vh',
  },
  title: {
    fontSize: '30px',
    marginBottom: '20px',
    color: '#144981',
    textAlign: 'center',
    fontWeight: '600'
  },
  items: {
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    background: '#f5f5f5',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
    marginBottom: '20px',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)'
    }
  },
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    marginRight: '10px',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  details: {
    flexGrow: '1',
    width: '70%'
  },
  name: {
    fontSize: '18px',
    color: '#333'
  },
  description: {
    fontSize: '16px',
    color: '#666',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  price: {
    fontSize: '16px',
    color: '#333'
  },
  removeButton: {
    background: 'linear-gradient(45deg, #ff6347, #e9382c)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '3px',
    fontSize: '16px'
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888'
  },
  imageBox: {
    marginRight: '20px',
    flexBasis: '100px'
  },
}

export default Wishlist
