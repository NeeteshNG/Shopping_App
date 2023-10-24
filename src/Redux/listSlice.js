import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart : [],
    wishlist : [],
}

const listSlice = createSlice({
    name : 'list',
    initialState,
    reducers:{
        addToCart : (state, action) => {
            state.cart.push(action.payload);
            console.log(state.cart)
        },
        addToWishlist : (state, action) => {
            state.wishlist.push(action.payload);
            console.log(state.wishlist)
        },
        removeFromCart : (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },
        removeFromWishlist : (state, action) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
        }
    }
});

export const { addToCart, addToWishlist, removeFromCart, removeFromWishlist } = listSlice.actions;

export default listSlice.reducer;