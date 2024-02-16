import { useState, useEffect } from 'react'

const useAppController = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [products, setProducts] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0)
  const [userCartInfo, setUserCartInfo] = useState([])
  const [userCartProducts, setUserCartProducts] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchCartProducts()
    fetchProducts()

    const userIsLoggedIn = localStorage.getItem('loggedIn') === 'true'
    if (userIsLoggedIn) {
      setLoggedIn(true)
    }
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/productsApi/products/'
      )
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchCartProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'http://127.0.0.1:8000/cartApi/cart-items/',
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      const userCartProductsInfo = data

      setUserCartInfo(data)

      const authUserIdInfo = userCartProductsInfo.filter(
        id_of => id_of.user === user.id
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
      console.error('Error fetching products:', error)
    }
  }

  const removeItemFromCart = async productId => {
    try {
      const filteredProductInfo = userCartInfo.filter(
        info => info.product === productId
      )
      const token = localStorage.getItem('token')
      const cartItemId = filteredProductInfo[0].id

      const deleteResponse = await fetch(
        `http://127.0.0.1:8000/cartApi/cart-items/${cartItemId}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete cart item')
      }

      const updatedCart = userCartProducts.filter(item => item.id !== productId)
      setUserCartProducts(updatedCart)
      fetchCartProducts()
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const incrementCartItemQuantity = async productId => {
    try {
      const filteredProductInfo = userCartInfo.filter(
        info => info.product === productId
      )
      const cartItemId = filteredProductInfo[0].id
      const token = localStorage.getItem('token')

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
      console.error('Error incrementing item quantity:', error)
    }
  }

  const decrementCartItemQuantity = async productId => {
    try {
      const filteredProductInfo = userCartInfo.filter(
        info => info.product === productId
      )
      const cartItemId = filteredProductInfo[0].id
      const token = localStorage.getItem('token')

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
      fetchCartProducts()
    } catch (error) {
      console.error('Error decrementing item quantity:', error)
    }
  }

  const totalAmountOfCart = userCartProducts && userCartProducts.length > 0 ? userCartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ) : 0;

  return {
    loggedIn,
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
    totalAmountOfCart
  }
}

export default useAppController
