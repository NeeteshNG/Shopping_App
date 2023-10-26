import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import userReducer from "../UserAuth/Redux_User/userSlice"
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key : 'root',
    storage
}

const combinePersistForList = persistReducer(persistConfig, listReducer)

const combinePersistForUser = persistReducer(persistConfig, userReducer)

const store = configureStore({
    reducer:{
        list : combinePersistForList,
        user : combinePersistForUser
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions : ['persist/PERSIST'],
        },
    })
})

const persistor = persistStore(store);

export {persistor, store}