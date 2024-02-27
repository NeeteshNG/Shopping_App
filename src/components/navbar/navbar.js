import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { AppBar, Box, MenuItem, Select, Toolbar } from '@mui/material'
import { FavoriteOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoginIcon from '@mui/icons-material/Login'

function Navbar ({ loggedIn, cartQuantity, wishlistQuantity, handleLogout }) {
  const cartNotification = cartQuantity
  const wishlistNotification = wishlistQuantity

  const navigate = useNavigate()

  const handleSelectChange = async event => {
    const selectedValue = event.target.value
    if (selectedValue === 'profile') {
      navigate('/profile')
    } else if (selectedValue === 'logout' && loggedIn) {
      await handleLogout()
      navigate('/loginpage')
    }
  }

  return (
    <AppBar style={navStyles.mainBar}>
      <Toolbar style={navStyles.navUl}>
        <Box style={navStyles.leftPart}>
          <Link to='/Shopping_App' style={navStyles.navButtons}>
            Home
          </Link>
          <Link to='/products' style={navStyles.navButtons}>
            Products
          </Link>
        </Box>
        <Box style={navStyles.rightPart}>
          <Box>
            <Link to='/cart' style={navStyles.navButtons}>
              <ShoppingCartOutlined />
            </Link>
            {cartNotification !== 0 && (
              <Box style={navStyles.cartNotifiyDot}>
                {cartNotification || 0}
              </Box>
            )}
          </Box>
          <Box>
            <Link to='/wishlist' style={navStyles.navButtons}>
              <FavoriteOutlined />
            </Link>
            {wishlistNotification !== 0 && (
              <Box style={navStyles.wishlistNotifiyDot}>
                {wishlistNotification || 0}
              </Box>
            )}
          </Box>
          {!loggedIn && (
            <Box>
              <Link to='/loginpage' style={navStyles.navButtons}>
                <LoginIcon />
              </Link>
            </Box>
          )}
          <Box style={{width: '20%'}}>
            {loggedIn && (
              <>
                <Select
                  style={navStyles.dropDownSelect}
                  IconComponent={props => (
                    <ArrowDropDownCircleIcon
                      {...props}
                      style={navStyles.selectIcon}
                    />
                  )}
                  onChange={handleSelectChange}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left'
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left'
                    },
                    getContentAnchorEl: null,
                    PaperProps: {
                      style: {
                        maxHeight: '200px',
                        borderRadius: '10px',
                        marginTop: '5px',
                        marginLeft: '-10px'
                      }
                    }
                  }}
                >
                  <MenuItem
                    style={navStyles.dropDownOptionButton}
                    value='logout'
                  >
                    Logout <LogoutIcon />
                  </MenuItem>
                  <MenuItem
                    style={navStyles.dropDownOptionButton}
                    value='profile'
                  >
                    Profile <AccountBoxIcon />
                  </MenuItem>
                </Select>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>

      <Outlet />
    </AppBar>
  )
}

const navStyles = {
  mainBar: {
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000',
    position: 'fixed'
  },
  navUl: {
    display: 'flex',
    background: '#144981',
    padding: '10px',
    position: 'relative',
    minHeight: '36px'
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px'
  },
  rightPart: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    right: '10px',
    gap: '10px'
  },
  navButtons: {
    position: 'relative',
    color: 'white',
    fontSize: '20px',
    fontWeight: 500,
    padding: '6px 0',
    textDecoration: 'none'
  },
  cartNotifiyDot: {
    backgroundColor: '#ff6347',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '10px',
    position: 'absolute',
    height: '10px',
    width: '10px',
    top: '-8px',
    right: '-7px',
    left: '12px',
    bottom: '15px',
    padding: '3px'
  },
  wishlistNotifiyDot: {
    backgroundColor: '#ff6347',
    color: 'white',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: '10px',
    position: 'absolute',
    height: '10px',
    width: '10px',
    top: '-8px',
    right: '-7px',
    left: '45px',
    bottom: '15px',
    padding: '3px'
  },
  dropDownSelect: {
    color: '#144981',
    height: '25px',
    width: '42px',
    borderRadius: '10px',
    border: '1px solid white',
    position: 'relative'
  },
  dropDownOptionButton: {
    gap: '5px',
    color: '#144981'
  },
  selectIcon: {
    color: 'white'
  }
}

export default Navbar
