import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'

const useAppController = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [products, setProducts] = useState([])
  const [userCartInfo, setUserCartInfo] = useState([])
  const [userCartProducts, setUserCartProducts] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0)
  const [userWishlistInfo, setUserWishlistInfo] = useState([])
  const [userWishlistProducts, setUserWishlistProducts] = useState([])
  const [wishlistQuantity, setWishlistQuantity] = useState(0)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)  
  const initialFormData = useState({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    address: "",
  });
  const [formData, setFormData] = useState({ ...initialFormData });

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
        console.error('Error fetching products:', error)
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
        console.error('Error fetching products:', error)
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

      fetchCartProducts(response?.data)
      fetchWishlistProducts(response?.data)
    } catch (error) {
      console.error('Error fetching products:', error)
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

  const totalAmountOfCart =
    userCartProducts && userCartProducts.length > 0
      ? userCartProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        )
      : 0

  const toggleWishlist = async product => {
    if (!token) {
      console.error('Token not available')
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
        console.log('Item removed from wishlist on the server')
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
        console.log('Item added to wishlist on the server')
        fetchProducts()
      }
    } catch (error) {
      console.error('Error toggling wishlist item:', error)
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
          console.log('Item added to cart on the server:', response.data)
          fetchProducts()
          setQuantity(1)
        })
        .catch(error => {
          console.error('Error adding item to cart:', error)
        })
    } else {
      console.error('User data not available')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout/', null, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      setLoggedIn(false)
      localStorage.removeItem('user')
      localStorage.removeItem('loggedIn')
      localStorage.removeItem('token')
      setCartQuantity(0);
      setWishlistQuantity(0);
      setUserCartProducts([]);
      setUserWishlistProducts([])
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', 'true')
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem('token', data.token)
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const handleSlide = (direction) => {
    const lastIndex = products.length - 1;
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
    } else {
      newIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
    }

    setCurrentIndex(newIndex);
  };

  const handleIncrement = (product) => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      alert(
        `Maximum available quantity for ${product.name} is ${product.stock}`
      );
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChangeOnRegister = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOfRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );
      console.log("Registration successful!", response.data);
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Registration failed!", error.response.data);
      setFormData({ ...initialFormData });
    }
  };

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
    setQuantity
  }
}

export default useAppController
