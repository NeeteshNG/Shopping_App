import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import userReducer from "../UserAuth/Redux_User/userSlice";

const store = configureStore({
  reducer: {
    list: listReducer,
    user: userReducer,
  },
});

export default store;
