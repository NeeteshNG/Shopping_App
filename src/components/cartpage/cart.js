import React, { useEffect } from 'react'
import { Box, Button, CardMedia, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function Cart ({
  fetchCartProducts,
  userCartProducts,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  totalAmount
}) {
  useEffect(() => {
    fetchCartProducts()
  }, [fetchCartProducts])

  return (
    <Box style={cartStyles.container}>
      <Box style={cartStyles.titleBox}>
        <Typography style={cartStyles.title}>Your Cart</Typography>
      </Box>
      {userCartProducts && userCartProducts.length > 0 ? (
        userCartProducts.map(product => (
          <Box key={product.id} style={cartStyles.item}>
            <Box style={cartStyles.imageBox}>
              <Link to={`/products/${product.id}`}>
                <CardMedia
                  component='img'
                  image={product.images[0].image}
                  alt={product.name}
                  style={cartStyles.image}
                />
              </Link>
            </Box>
            <Box style={cartStyles.details}>
              <Typography variant='h6' gutterBottom>
                {product.name}
              </Typography>
              <Typography
                variant='body1'
                gutterBottom
                style={cartStyles.overFlowStyle}
              >
                {product.description}
              </Typography>
              <Typography variant='body1'>Price: {product.price}/-</Typography>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='row'>
              <Box style={cartStyles.quantityBox}>
                <IconButton
                  onClick={() => decrementQuantity(product.id)}
                  aria-label='decrement'
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant='body1'>{product.quantity}</Typography>
                <IconButton
                  onClick={() => incrementQuantity(product.id)}
                  aria-label='increment'
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box style={cartStyles.buttonBox}>
                <IconButton
                  onClick={() => removeItem(product.id)}
                  variant='outlined'
                  size='small'
                  color='error'
                  fullWidth
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant='body1' align='center'>
          Your cart is empty.
        </Typography>
      )}
      {userCartProducts && userCartProducts.length > 0 && (
        <Box style={cartStyles.totalBox}>
          <Typography variant='h5' align='right'>
            Total: {totalAmount}/-
          </Typography>
          <Box style={cartStyles.checkoutBox}>
            <Button
              component={Link}
              to='/checkout'
              variant='contained'
              color='primary'
            >
              Checkout
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const cartStyles = {
  container: {
    marginTop: '100px',
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  titleBox: {
    padding: '10px 0px'
  },
  title: {
    color: '#144981',
    fontWeight: '600',
    fontSize: '35px'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    width: '70%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9'
  },
  imageBox: {
    marginRight: '20px',
    flexBasis: '100px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  details: {
    flex: '1',
    width: '50%'
  },
  quantityBox: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px'
  },
  buttonBox: {
    flexBasis: '100px',
    textAlign: 'center'
  },
  totalBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
  },
  checkoutBox: {
    marginTop: '20px'
  },
  overFlowStyle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}

export default Cart
