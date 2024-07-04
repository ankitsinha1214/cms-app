import { configureStore } from '@reduxjs/toolkit'
// Reducers
import { userReducer } from './reducer/userReducer'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})