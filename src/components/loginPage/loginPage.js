import React from 'react'
import { useNavigate } from 'react-router'
import { Box, Typography, TextField, Button } from '@mui/material'

const LoginPage = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await handleLogin()
    navigate('/products')
  }

  return (
    <Box style={loginStyles.loginBody}>
      <Box style={loginStyles.formBox}>
        <Typography style={loginStyles.loginText}>LOGIN</Typography>
        <Box style={loginStyles.formColumn}>
          <TextField
            label='Email'
            variant='filled'
            type='email'
            name='email'
            value={username}
            autoComplete='off'
            onChange={e => setUsername(e.target.value)}
            fullwidth="true"
            required
            InputProps={{ style: { color: '#144981' } }}
            InputLabelProps={{ style: { color: '#144981' } }}
          />
          <TextField
            label='Password'
            variant='filled'
            type='password'
            name='password'
            value={password}
            autoComplete='off'
            onChange={e => setPassword(e.target.value)}
            fullwidth="true"
            required
            InputProps={{ style: { color: '#144981' } }}
            InputLabelProps={{ style: { color: '#144981' } }}
          />
        </Box>
        <Box style={loginStyles.submitButtonBox}>
          <Button
            variant='contained'
            onClick={handleSubmit}
            style={loginStyles.submitButton}
          >
            Login
          </Button>
        </Box>
        <Box style={loginStyles.registerTextBox}>
          <Typography style={{ color: '#144981' }}>
            Not a Member?{' '}
          </Typography>
          <Typography
            onClick={() => navigate('/registerPage')}
            style={{
              color: '#144981',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
          >
            Register
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const loginStyles = {
  loginBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '120px',
    marginBottom: '100px'
  },
  formBox: {
    width: '40%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '20px',
    flexDirection: 'column',
    border: '5px solid #144981'
  },
  loginText: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#144981',
    marginBottom: '20px'
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '70%'
  },
  submitButtonBox: {
    margin: '20px 0'
  },
  submitButton: {
    backgroundColor: '#144981',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#FF8C00'
    }
  },
  registerTextBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    color: '#144981'
  }
}

export default LoginPage
