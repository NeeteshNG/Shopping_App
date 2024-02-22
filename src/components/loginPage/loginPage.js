import React from 'react'
import './loginPage.css'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

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
    <div className='content-body'>
      <div className='signin'>
        <div className='content'>
          <h2>Log In</h2>

          <div className='form'>
            <div className='inputBox'>
              <input
                type='text'
                value={username}
                autoComplete='off'
                name='username'
                onChange={e => setUsername(e.target.value)}
                required
              />{' '}
              <i>Email</i>
            </div>

            <div className='inputBox'>
              <input
                type='password'
                value={password}
                autoComplete='off'
                name='password'
                onChange={e => setPassword(e.target.value)}
                required
              />{' '}
              <i>Password</i>
            </div>
            <div className='inputBox' onClick={handleSubmit}>
              <input type='submit' value='Login' />
            </div>
          </div>
          <p className='register-text'>
            Not a Member ? <Link to='/registerPage'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
