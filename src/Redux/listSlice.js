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
            state.cart.push(action.payload);
            state.cartNotification++;
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

export const { addToCart, addToWishlist, removeFromCart, removeFromWishlist } = listSlice.actions;

export default listSlice.reducer;