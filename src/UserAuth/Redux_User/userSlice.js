import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: storedData || {
    id: null,
    names: null,
    address: null,
    phone: null,
    username: null,
    password: null,
    cart: [],
    wishlist: [],
    cartNotification: 0,
    wishlistNotification: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload.user;
      state.user.id = userData.id;
      state.user.names = userData.names;
      state.user.address = userData.address;
      state.user.phone = userData.phone;
      state.user.username = userData.username;
      state.user.password = userData.password;
      state.user.cart = userData.cart || [];
      state.user.wishlist = userData.wishlist || [];
      state.user.cartNotification = userData.cartNotification || 0;
      state.user.wishlistNotification = userData.wishlistNotification || 0;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    logout: (state) => {
      state.user = {};
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.user.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        product.quantity = 1;
        state.user.cart.push(product);
    }
    state.user.cartNotification = state.user.cart.length;
    console.log(state.user.cartNotification);
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.user.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.user.cart.find((item) => item.id === productId);
      if (product) {
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          state.user.cart = state.user.cart.filter((item) => item.id !== productId);
        }
      }
    },
    addToWishlist: (state, action) => {
      state.user.wishlist.push(action.payload);
      state.user.wishlistNotification++;
    },
    removeFromCart: (state, action) => {
      state.user.cart = state.user.cart.filter((item) => item.id !== action.payload.id);
      state.user.cartNotification--;
    },
    removeFromWishlist: (state, action) => {
      state.user.wishlist = state.user.wishlist.filter((item) => item.id !== action.payload.id);
      state.user.wishlistNotification--;
    },
  },
});

export const {
  login,
  logout,
  addToCart,
  addToWishlist,
  removeFromCart,
  removeFromWishlist,
  incrementQuantity,
  decrementQuantity,
} = userSlice.actions;

export default userSlice.reducer;
