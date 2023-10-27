import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :   {
        id: null,
        names: null,
        address: null,
        phone: null,
        username: null,
        password: null,
        cart: [],
      },
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state, action) => {
            state.user.id = action.payload.user.id;
            state.user.names = action.payload.user.names;
            state.user.address = action.payload.user.address;
            state.user.phone = action.payload.user.phone;
            state.user.username = action.payload.user.username;
            state.user.password = action.payload.user.password;
        },
        logout : (state) => {
            state.user = {};
        }
    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;