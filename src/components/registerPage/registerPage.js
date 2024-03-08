import { Box, Typography, TextField, Button, Modal } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { MuiTelInput } from 'mui-tel-input'
import { useNavigate } from 'react-router'
import { validateChar } from '../../utilities'

const RegisterForm = ({
  formData,
  handleChange,
  handleSubmit,
  errors,
  registerSuccess,
  otp,
  handleVerifyOtp,
  handleChangeOtp,
  handleCloseOtpModal
}) => {
  const navigate = useNavigate()

  const handleSubmitButton = async e => {
    await handleSubmit(e)
    if (registerSuccess) {
      navigate('/loginpage')
    }
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
            <MuiTelInput
              label='Phone Number'
              value={formData.phone_number}
              onChange={value =>
                handleChange({ target: { name: 'phone_number', value } })
              }
              required
              error={errors.phone_number ? true : false}
              InputProps={{
                style: { color: errors.phone_number ? 'red' : '#144981' }
              }}
              InputLabelProps={{
                style: { color: errors.phone_number ? 'red' : '#144981' }
              }}
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
          <Modal open={otp.openModal} onClose={handleCloseOtpModal}>
            <Box sx={registerStyles.modalBox}>
              <Typography style={registerStyles.modalHeadText}>
                Enter OTP to Proceed
              </Typography>
              <MuiOtpInput
                value={otp.otpValue}
                length={6}
                onChange={handleChangeOtp}
                validateChar={validateChar}
                TextFieldsProps={{
                  disabled: false,
                  size: 'small',
                  placeholder: '-'
                }}
                sx={registerStyles.otpInputBox}
              />
              <Box style={registerStyles.submitButtonBox}>
                <Button
                  variant='contained'
                  onClick={handleVerifyOtp}
                  style={registerStyles.submitButton}
                >
                  Submit
                </Button>
              </Box>
              <Typography style={registerStyles.modalResendText}>Resend</Typography>
            </Box>
          </Modal>
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
  },
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '4px solid #144981',
    boxShadow: 50,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: '20px'
  },
  otpInputBox: {
    border: '2px solid #144981',
    padding: '20px',
    borderRadius: '8px',
    width: '70%'
  },
  modalHeadText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#144981',
    marginBottom: '20px'
  },
  modalResendText: {
    fontSize: '15px',
    color: '#144981',
    marginBottom: '20px',
    textDecoration: 'underline',
    cursor: 'pointer',
  }
}

export default RegisterForm
