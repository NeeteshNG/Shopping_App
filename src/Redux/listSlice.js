import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : [],
    wishlist : [],
    cartNotification : 0,
    wishlistNotification : 0,
}

const listSlice = createSlice({
    name : 'list',
    initialState,
    reducers:{
        addToCart : (state, action) => {
            const product = action.payload;
            const existingProduct = state.cart.find((item) => item.id === product.id);
            if (existingProduct) {
              existingProduct.quantity++;
            } else {
              product.quantity = 1;
              state.cart.push(product);
              state.cartNotification++;
            }
        },
        incrementQuantity: (state, action) => {
          const productId = action.payload;
          const product = state.cart.find((item) => item.id === productId);
          if (product) {
            product.quantity++;
          }
        },
        decrementQuantity: (state, action) => {
          const productId = action.payload;
          const product = state.cart.find((item) => item.id === productId);
          if (product) {
            if (product.quantity > 1) {
              product.quantity--; 
            } else {
              state.cart = state.cart.filter((item) => item.id !== productId);
            }
          }
        },
        addToWishlist : (state, action) => {
            state.wishlist.push(action.payload);
            state.wishlistNotification++;
        },
        removeFromCart : (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            state.cartNotification--;
        },
        removeFromWishlist : (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
            state.wishlistNotification--;
        }
    }
});

export const { addToCart, addToWishlist, removeFromCart, removeFromWishlist, incrementQuantity, decrementQuantity } = listSlice.actions;

export default listSlice.reducer;