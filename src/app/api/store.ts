import { combineReducers, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import tokenSlice from "../FEATURES/components/AUTH/tokenSlice";
import { authApi } from "./_APISLICES/authApiSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { bookApi } from "./_APISLICES/bookApiSlice";
import { userApi } from "./_APISLICES/userApiSlice";
import bookSlice from "../FEATURES/components/BOOK/bookSlice";
import scrapingDataSlice from "../FEATURES/components/SCRAPING_DATA/scrapingDataSlice";
import usersSlice from "../FEATURES/components/USER/usersSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token"],
};

const rootReducer = combineReducers({
    token: tokenSlice,
    book: bookSlice,
    scrapedData: scrapingDataSlice,
    users: usersSlice,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: EnhancedStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(authApi.middleware)
            .concat(bookApi.middleware)
            .concat(userApi.middleware), // Aggiungi il middleware di authApi
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
