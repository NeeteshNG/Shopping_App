import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { capitalizeWords, preprocessPhoneNumber } from './utilities'

const useAppController = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [products, setProducts] = useState([])
  const [userCartInfo, setUserCartInfo] = useState([])
  const [userCartProducts, setUserCartProducts] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0)
  const [userWishlistInfo, setUserWishlistInfo] = useState([])
  const [userWishlistProducts, setUserWishlistProducts] = useState([])
  const [wishlistQuantity, setWishlistQuantity] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const initialFormData = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    phone_number: '+91',
    address: ''
  })
  const [formData, setFormData] = useState(...initialFormData)
  const [errors, setErrors] = useState({})
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const [alert, setAlert] = useState({
    open: false,
    type: '',
    message: ''
  })

  const [otp, setOtp] = useState({
    openModal: false,
    otpValue: ''
  })

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert({ open: false, type: '', message: '' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [alert.open])

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  const fetchCartProducts = useCallback(
    async products => {
      try {
        if (!token || !user?.id) return
        const response = await axios.get(
          'http://127.0.0.1:8000/cartApi/cart-items/',
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )

        const userCartProductsInfo = response.data

        setUserCartInfo(response.data)

        const authUserIdInfo = userCartProductsInfo.filter(
          id_of => id_of.user === user?.id
        )

        const filteredProducts = authUserIdInfo
          .map(info => {
            const product = products.find(item => item.id === info.product)
            if (product) {
              return { ...product, quantity: info.quantity }
            }
            return null
          })
          .filter(Boolean)

        setUserCartProducts(filteredProducts)
        setCartQuantity(filteredProducts.length)
      } catch (error) {
        setAlert({
          open: true,
          message: `Error: ${error?.message}. Kindly contact the developer`,
          type: 'error'
        })
      }
    },
    [user?.id, token]
  )

  const fetchWishlistProducts = useCallback(
    async products => {
      try {
        if (!token || !user?.id) return

        const response = await axios.get(
          'http://127.0.0.1:8000/wishlistApi/wishlist-items/',
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )

        const userWishlistProductsInfo = response.data

        setUserWishlistInfo(response.data)

        const authUserIdInfo = userWishlistProductsInfo.filter(
          id_of => id_of.user === user?.id
        )

        const filteredWishlistProducts = authUserIdInfo
          .map(info => {
            const product = products.find(item => item.id === info.product)
            if (product) {
              return { ...product }
            }
            return null
          })
          .filter(Boolean)

        setUserWishlistProducts(filteredWishlistProducts)
        setWishlistQuantity(filteredWishlistProducts.length)
      } catch (error) {
        setAlert({
          open: true,
          message: `Error: ${error?.message}. Kindly contact the developer`,
          type: 'error'
        })
      }
    },
    [user?.id, token]
  )

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/productsApi/products/'
      )
      setProducts(response?.data)
      if (!token || !user?.id) return

      await fetchCartProducts(response?.data)
      await fetchWishlistProducts(response?.data)
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error?.message}. Kindly contact the developer`,
        type: 'error'
      })
    }
  }, [fetchCartProducts, fetchWishlistProducts, token, user?.id])

  useEffect(() => {
    fetchProducts()

    const userIsLoggedIn = localStorage.getItem('loggedIn') === 'true'
    if (userIsLoggedIn) {
      setLoggedIn(true)
    }
  }, [fetchProducts])

  const removeItemFromCart = async productId => {
    try {
      const filteredProductInfo = userCartInfo.filter(
        info => info.product === productId
      )
      const cartItemId = filteredProductInfo[0].id

      await axios.delete(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      const updatedCart = userCartProducts.filter(item => item.id !== productId)
      setUserCartProducts(updatedCart)
      fetchCartProducts(products)
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error'
      })
    }
  }

  const incrementCartItemQuantity = async productId => {
    try {
      const filteredProductInfo = userCartInfo.filter(
        info => info.product === productId
      )
      const cartItemId = filteredProductInfo[0].id

      const incrementResponse = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/increment/`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...filteredProductInfo,
            quantity: filteredProductInfo[0].quantity + 1
          })
        }
      )

      if (!incrementResponse.ok) {
        throw new Error('Failed to update cart item quantity')
      }

      const updatedCart = userCartProducts.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
      setUserCartProducts(updatedCart)
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error'
      })
    }
  }

  const decrementCartItemQuantity = async productId => {
    try {
      const filteredProductInfo = userCartInfo.filter(
        info => info.product === productId
      )
      const cartItemId = filteredProductInfo[0].id

      if (filteredProductInfo[0].quantity === 1) {
        return removeItemFromCart(productId)
      }

      const decrementResponse = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/decrement/`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...filteredProductInfo,
            quantity: filteredProductInfo[0].quantity - 1
          })
        }
      )

      if (!decrementResponse.ok) {
        throw new Error('Failed to update cart item quantity')
      }

      const updatedCart = userCartProducts.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      setUserCartProducts(updatedCart)
      fetchCartProducts(products)
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error'
      })
    }
  }

  const totalAmountOfCart =
    userCartProducts && userCartProducts.length > 0
      ? userCartProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        )
      : 0

  const toggleWishlist = async product => {
    if (!token) {
      setAlert({
        open: true,
        message: `Please Login to add ${product.name} to the wishlist.`,
        type: 'error'
      })
      return
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/wishlistApi/wishlist-items/?user=${user?.id}&product=${product.id}`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      const wishlistItemProductId = response.data.map(item => item.product)

      if (wishlistItemProductId.includes(product.id)) {
        const wishlistItemIndex = response.data.findIndex(
          item => item.product === product.id
        )
        const wishlistItemId = response.data[wishlistItemIndex].id

        await axios.delete(
          `http://127.0.0.1:8000/wishlistApi/wishlist-items/delete/${wishlistItemId}/`,
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        setAlert({
          open: true,
          message: `"${capitalizeWords(
            product.name
          )}" removed from the Wishlist.`,
          type: 'warning'
        })
        fetchProducts()
      } else {
        await axios.post(
          'http://127.0.0.1:8000/wishlistApi/wishlist-items/',
          {
            product: product.id,
            user: user?.id
          },
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        setAlert({
          open: true,
          message: `"${capitalizeWords(product.name)}" added to the Wishlist.`,
          type: 'success'
        })
        fetchProducts()
      }
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error'
      })
    }
  }

  const handleAddToCart = (product, quantity = 1) => {
    if (user && user?.id) {
      axios
        .post(
          'http://127.0.0.1:8000/cartApi/add-to-cart/',
          {
            product: product.id,
            user: user?.id,
            quantity: quantity
          },
          {
            headers: {
              Authorization: `Token ${token}`
            }
          }
        )
        .then(response => {
          fetchProducts()
          setQuantity(1)
          setAlert({
            open: true,
            message: `"${capitalizeWords(product.name)}" added to the cart.`,
            type: 'success'
          })
        })
        .catch(error => {
          setAlert({
            open: true,
            message: `Error : "${error.message}".`,
            type: 'error'
          })
        })
    } else {
      setAlert({
        open: true,
        message: `Please Login to add "${capitalizeWords(
          product.name
        )}" to the Cart.`,
        type: 'error'
      })
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout/', null, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      const user_name = user.name
      setLoggedIn(false)
      localStorage.removeItem('user')
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('token')
      setCartQuantity(0)
      setWishlistQuantity(0)
      setUserCartProducts([])
      setUserWishlistProducts([])
      setAlert({
        open: true,
        message: `Logout Successful. See you Later, ${capitalizeWords(
          user_name
        )}.`,
        type: 'success'
      })
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.message}`,
        type: 'error'
      })
    }
  }

  const handleLogin = async () => {
    setRegisterSuccess(false)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: username,
        password: password
      })

      if (response.status === 200) {
        const data = response.data
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('loggedIn', 'true')
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('token', data.token)
          setAlert({
            open: true,
            message: `Welcome, you have successfully logged in, ${capitalizeWords(
              data.user.name
            )}.`,
            type: 'success'
          })
          setUsername('')
          setPassword('')
        }
      } else {
        setAlert({
          open: true,
          message: `Login Failed. Please try again.`,
          type: 'error'
        })
      }
    } catch (error) {
      setAlert({
        open: true,
        message: `Error: ${error.response.data.error}`,
        type: 'error'
      })
    }
  }

  const handleSlide = direction => {
    const lastIndex = products.length - 1
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex
    } else {
      newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0
    }

    setCurrentIndex(newIndex)
  }

  const handleIncrement = product => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    } else {
      alert(
        `Maximum available quantity for ${product.name} is ${product.stock}`
      )
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleChangeOnRegister = e => {
    const { name, value } = e.target
    let updatedFormData = { ...formData }
    let updatedErrors = { ...errors }

    switch (name) {
      case 'email':
        if (!value) {
          delete updatedErrors.email
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          updatedErrors.email = 'Invalid Email Format'
        } else {
          delete updatedErrors.email
        }
        break
      case 'username':
        if (!value) {
          delete updatedErrors.username
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
          updatedErrors.username =
            'Username must contain letters and numbers combined'
        } else {
          delete updatedErrors.username
        }
        break
      case 'password':
        if (!value) {
          delete updatedErrors.password
        } else if (!/(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-zA-Z])/.test(value)) {
          updatedErrors.password =
            'Password must contain at least one symbol, one number, and one letter'
        } else {
          delete updatedErrors.password
        }
        break
      case 'name':
        if (!value) {
          delete updatedErrors.name
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          updatedErrors.name = 'Name must contain only letters'
        } else {
          delete updatedErrors.name
        }
        break
      case 'phone_number':
        if (!value) {
          delete updatedErrors.phone_number
        }
        break
      case 'address':
        if (!value) {
          delete updatedErrors.address
        } else {
          delete updatedErrors.address
        }
        break
      default:
        break
    }

    updatedFormData = { ...updatedFormData, [name]: value }
    setFormData(updatedFormData)
    setErrors(updatedErrors)
  }

  const handleSubmitOfRegister = async e => {
    e.preventDefault()
    const formDataEdit = formData
    formDataEdit.phone_number = preprocessPhoneNumber(formDataEdit.phone_number)

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
        formDataEdit
      )

      if (response.status === 200) {
        setAlert({
          open: true,
          message: `OTP Sent.`,
          type: 'success'
        })
        setOtp({
          openModal: true
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleVerifyOtp = async () => {
    const final_phone_number = preprocessPhoneNumber(formData.phone_number)

    const data = {
      otp: otp.otpValue,
      email: formData.email,
      name: formData.name,
      username: formData.username,
      password: formData.password,
      phone_number: final_phone_number,
      address: formData.address
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/verify_otp/',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 201) {
        setOtp({
          openModal: false,
          otpValue: ''
        })
        setAlert({
          open: true,
          message: `Registration Successfull.`,
          type: 'success'
        })
        setFormData(...initialFormData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeOtp = value => {
    setOtp({
      openModal: true,
      otpValue: value
    })
  }

  const handleCloseOtpModal = value => {
    setOtp({
      openModal: false,
      otpValue: ''
    })
  }

  return {
    loggedIn,
    user,
    products,
    cartQuantity,
    userCartInfo,
    userCartProducts,
    setLoggedIn,
    setProducts,
    setCartQuantity,
    setUserCartInfo,
    setUserCartProducts,
    fetchProducts,
    fetchCartProducts,
    removeItemFromCart,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    totalAmountOfCart,
    toggleWishlist,
    userWishlistProducts,
    userWishlistInfo,
    wishlistQuantity,
    handleAddToCart,
    handleLogout,
    handleLogin,
    setUsername,
    setPassword,
    username,
    password,
    handleSlide,
    currentIndex,
    quantity,
    handleIncrement,
    handleDecrement,
    selectedImageIndex,
    setSelectedImageIndex,
    formData,
    handleChangeOnRegister,
    handleSubmitOfRegister,
    setQuantity,
    alert,
    setAlert,
    errors,
    registerSuccess,
    setRegisterSuccess,
    otp,
    handleVerifyOtp,
    handleChangeOtp,
    handleCloseOtpModal
  }
}

export default useAppController
