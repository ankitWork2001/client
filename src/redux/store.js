import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice.js'
import storeReducer from './storeSlice.js'
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    store: storeReducer,
  },
})