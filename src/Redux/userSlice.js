import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: storedData || {
    id: null,
    name: null,
    address: null,
    phone_number: null,
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
    login: (action) => {
      const userData = action.payload.user;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    logout: (state) => {
      state.user = {};
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.user.cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        state.user.cart[existingProductIndex] = {
          ...state.user.cart[existingProductIndex],
          quantity: state.user.cart[existingProductIndex].quantity + 1,
        };
      } else {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        state.user.cart.push(newProduct);
      }
      state.user.cartNotification = state.user.cart.length;
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
          state.user.cart = state.user.cart.filter(
            (item) => item.id !== productId
          );
        }
      }
    },
    addToWishlist: (state, action) => {
      if (!state.user.wishlist) {
        state.user.wishlist = []; // Initialize wishlist array if it's undefined
      }
      state.user.wishlist.push(action.payload);
      state.user.wishlistNotification = state.user.wishlist.length;
    },
    removeFromCart: (state, action) => {
      state.user.cart = state.user.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.user.cartNotification--;
    },
    removeFromWishlist: (state, action) => {
      if (!state.user.wishlist) {
        return state; // Wishlist not properly initialized, return current state
      }

      state.user.wishlist = state.user.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
      state.user.wishlistNotification = state.user.wishlist.length;
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
