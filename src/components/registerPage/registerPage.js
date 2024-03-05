import { Box, Typography, TextField, Button } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { useNavigate } from 'react-router'

const RegisterForm = ({ formData, handleChange, handleSubmit, errors }) => {
  const navigate = useNavigate()

  const handleSubmitButton = async e => {
    await handleSubmit(e)
    navigate('/loginpage')
  }
  
  return (
    <Box style={registerStyles.registerBody}>
      <Box style={registerStyles.formBox}>
        <Typography style={registerStyles.registerText}>REGISTER</Typography>
        <Box style={registerStyles.twoColumnBox}>
          <Box style={registerStyles.formColumn}>
            <TextField
              label={errors.email ? errors.email : 'Email'}
              variant='outlined'
              type='email'
              name='email'
              value={formData.email}
              autoComplete='off'
              onChange={handleChange}
              fullWidth={true}
              required
              InputProps={{
                style: { color: errors.email ? 'red' : '#144981' }
              }}
              InputLabelProps={{
                style: { color: errors.email ? 'red' : '#144981' }
              }}
              error={errors.email ? true : false}
            />
            <TextField
              label={errors.username ? errors.username : 'Username'}
              variant='outlined'
              type='text'
              name='username'
              value={formData.username}
              autoComplete='off'
              onChange={handleChange}
              fullWidth={true}
              required
              InputProps={{
                style: { color: errors.username ? 'red' : '#144981' }
              }}
              InputLabelProps={{
                style: { color: errors.username ? 'red' : '#144981' }
              }}
              error={errors.username ? true : false}
            />
            <TextField
              label={errors.password ? errors.password : 'Password'}
              variant='outlined'
              type='password'
              name='password'
              value={formData.password}
              autoComplete='off'
              onChange={handleChange}
              fullWidth={true}
              required
              InputProps={{
                style: { color: errors.password ? 'red' : '#144981' }
              }}
              InputLabelProps={{
                style: { color: errors.password ? 'red' : '#144981' }
              }}
              error={errors.password ? true : false}
            />
          </Box>
          <Box style={registerStyles.formColumn}>
            <TextField
              label={errors.name ? errors.name : 'Name'}
              variant='outlined'
              type='text'
              name='name'
              value={formData.name}
              autoComplete='off'
              onChange={handleChange}
              fullWidth={true}
              required
              InputProps={{ style: { color: errors.name ? 'red' : '#144981' } }}
              InputLabelProps={{
                style: { color: errors.name ? 'red' : '#144981' }
              }}
              error={errors.name ? true : false}
            />
            {/* <TextField
              label={errors.phone_number ? errors.phone_number : 'Phone Number'}
              variant='outlined'
              type='tel'
              name='phone_number'
              value={formData.phone_number}
              autoComplete='off'
              onChange={handleChange}
              fullWidth={true}
              required
              InputProps={{ style: { color: errors.phone_number ? 'red' : '#144981' } }}
              InputLabelProps={{ style: { color: errors.phone_number ? 'red' : '#144981' } }}
              error={errors.phone_number ? true : false}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                maxLength: 10
              }}
            /> */}
            <MuiTelInput
              label='Phone Number'
              value={formData.phone_number}
              onChange={value =>
                handleChange({ target: { name: 'phone_number', value } })
              }
              required
              error={errors.phone_number ? true : false}
              InputProps={{ style: { color: errors.phone_number ? 'red' : '#144981' } }}
              InputLabelProps={{ style: { color: errors.phone_number ? 'red' : '#144981' } }}
            />
            <TextField
              label={errors.address ? errors.address : 'Address'}
              variant='outlined'
              type='text'
              name='address'
              value={formData.address}
              autoComplete='off'
              onChange={handleChange}
              fullWidth={true}
              required
              InputProps={{
                style: { color: errors.address ? 'red' : '#144981' }
              }}
              InputLabelProps={{
                style: { color: errors.address ? 'red' : '#144981' }
              }}
              error={errors.address ? true : false}
            />
          </Box>
        </Box>
        <Box style={registerStyles.submitButtonBox}>
          <Button
            variant='contained'
            onClick={handleSubmitButton}
            style={registerStyles.submitButton}
          >
            REGISTER
          </Button>
        </Box>
        <Box style={registerStyles.loginTextBox}>
          <Typography style={{ color: '#144981' }}>
            Already a Member?{' '}
          </Typography>
          <Typography
            onClick={() => navigate('/loginpage')}
            style={{
              color: '#144981',
              cursor: 'pointer',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
          >
            Login
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const registerStyles = {
  registerBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '120px',
    marginBottom: '100px'
  },
  formBox: {
    width: '70%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    padding: '20px',
    flexDirection: 'column',
    border: '5px solid #144981'
  },
  registerText: {
    fontSize: '40px',
    fontWeight: 'bold',
    color: '#144981',
    marginBottom: '20px'
  },
  twoColumnBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '48%'
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
  loginTextBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    color: '#144981'
  }
}

export default RegisterForm
