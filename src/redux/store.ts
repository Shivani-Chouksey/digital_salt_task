import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage


const persistConfig = {
    key: 'root', // Key for the persisted state in storage
    storage,
    // whitelist: ['user'], // Persist only specific reducers
    // // blacklist: ['temporaryData'], // Skip specific reducers
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
})

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types

export { store, persistor };