import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Fab, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CopyrightIcon from '@mui/icons-material/Copyright'
import GitHubIcon from '@mui/icons-material/GitHub'

function Footer () {
  return (
    <Box style={footerStyle.footerBody}>
      <Box style={footerStyle.footerContent}>
        <Box style={footerStyle.footerSection}>
          <Typography style={footerStyle.sectionHeading}>About Us</Typography>
          <Typography style={footerStyle.aboutUsText}>
            This is the Shopping App that was Given as a Task to implement React
            Learnings that we have learned so Far. You can also go through the
            GitHub repository to see how this task is implemented from the
            scratch.
          </Typography>
        </Box>
        <Box style={footerStyle.footerSection}>
          <Typography style={footerStyle.sectionHeading}>Contact Us</Typography>
          <Box style={footerStyle.contactUsBox}>
            <EmailIcon />
            <Typography style={footerStyle.contactUsText}>
              : neeteshng@gmail.com
            </Typography>
          </Box>
          <Box style={footerStyle.contactUsBox}>
            <PermPhoneMsgIcon />
            <Typography style={footerStyle.contactUsText}>
              : +91 70008 35163
            </Typography>
          </Box>
        </Box>
        <Box style={footerStyle.footerSection}>
          <Typography style={footerStyle.sectionHeading}>
            Quick Links
          </Typography>
          <Box>
            <Box style={footerStyle.linkBox}>
              <HomeIcon />
              <Link style={footerStyle.linkToText} to='/Shopping_App'>
                Home
              </Link>
            </Box>
            <Box style={footerStyle.linkBox}>
              <ShoppingBagIcon />
              <Link style={footerStyle.linkToText} to='/products'>
                Products
              </Link>
            </Box>
            <Box style={footerStyle.linkBox}>
              <ShoppingCartIcon />
              <Link style={footerStyle.linkToText} to='/cart'>
                Cart
              </Link>
            </Box>
            <Box style={footerStyle.linkBox}>
              <FavoriteIcon />
              <Link style={footerStyle.linkToText} to='/wishlist'>
                Wishlist
              </Link>
            </Box>
          </Box>
        </Box>
        <Box style={footerStyle.footerSection}>
          <Fab
            color='primary'
            aria-label='add'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'black',
              margin: '60px'
            }}
          >
            <Link
              to='https://github.com/NeeteshNG/MyTaskBestPeers_4'
              rel='noreferrer'
              target='_blank'
              style={{
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <GitHubIcon style={{ height: '35px', width: '35px' }} />
            </Link>
          </Fab>
        </Box>
      </Box>
      <Box style={footerStyle.copyright}>
        <CopyrightIcon />
        <Typography style={footerStyle.copyrightText}>
          Neetesh Gupta. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  )
}

const footerStyle = {
  footerBody: {
    left: '0',
    right: '0',
    zIndex: '1000',
    backgroundColor: '#144981',
    color: 'white',
    padding: '5px 0',
    width: '100%',
    bottom: '0',
    marginTop: '30px'
  },
  footerContent: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 0px'
  },
  footerSection: {
    flex: '1',
    margin: '0 10px'
  },
  sectionHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white'
  },
  aboutUsText: {
    fontSize: '12px',
    color: 'white'
  },
  contactUsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px 0px'
  },
  contactUsText: {
    fontSize: '12px',
    color: 'white',
    marginLeft: '5px'
  },
  linkToText: {
    fontSize: '12px',
    color: 'white',
    marginLeft: '5px',
    fontWeight: '600',
    textDecoration: 'none'
  },
  linkBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px 0px'
  },
  copyright: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b2949',
    padding: '0px 0'
  },
  copyrightText: {
    fontSize: '12px',
    color: 'white'
  }
}

export default Footer
