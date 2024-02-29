import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import InfoIcon from '@mui/icons-material/Info'

function ProductCard ({
  product,
  toggleWishlist,
  userWishlistProducts,
  handleAddToCart,
  setQuantity
}) {
  const navigate = useNavigate()
  const { id, name, price, description, images } = product
  const isInWishlist = userWishlistProducts.some(item => item.id === product.id)

  const handleToggle = () => {
    navigate(`/products/${id}`)
  }

  return (
    <Card sx={cardStyles.cardBody}>
      <Box>
        <Link to={`/products/${id}`} onClick={() => setQuantity(1)}>
          <CardMedia
            component='img'
            sx={cardStyles.cardImage}
            image={images.length > 0 ? images[0].image : ''}
            alt={`${name}`}
          />
        </Link>
        <Box
          sx={
            isInWishlist
              ? cardStyles.wishlistFilledButton
              : cardStyles.wishlistButton
          }
          onClick={() => toggleWishlist(product)}
        >
          {isInWishlist ? <FavoriteIcon style={{ fontSize: "30px" }}/> 
              : <FavoriteBorderIcon style={{ fontSize: "30px" }}/>}
        </Box>
        <CardContent>
          <Typography sx={cardStyles.productName}>{name}</Typography>
          <Typography
            sx={cardStyles.productDescription}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            {description}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Price: {price} /-
          </Typography>
        </CardContent>
      </Box>
      <Box style={cardStyles.buttonsBox}>
        <IconButton
          onClick={() => handleAddToCart(product)}
          sx={cardStyles.button}
        >
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton onClick={handleToggle} sx={cardStyles.button}>
          <InfoIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

const cardStyles = {
  cardBody: {
    border: '2px solid #144981',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    position: 'relative',
    width: '250px',
    display: 'inline-block',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 6px 10px rgba(0, 0, 0, 20)'
    }
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  button: {
    color: '#144981',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#144981',
      color: 'white'
    }
  },
  cardImage: {
    height: '240px',
    width: '240px'
  },
  wishlistButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    color: '#144981',
    cursor: 'pointer',
    fontSize: '24px',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  wishlistFilledButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '24px',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  productDescription: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  productName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '18px',
    fontWeight: 600
  }
}

export default ProductCard
