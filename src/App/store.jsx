import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Reducers/Auth'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})