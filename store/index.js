import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


let persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer
})

let persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            
        }),
});

export const persistor = persistStore(store);
