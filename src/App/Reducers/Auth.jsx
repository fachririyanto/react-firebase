import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const loggedUser = Cookies.get('user')

const initialState = {
    user: loggedUser ? JSON.parse(loggedUser) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            Cookies.set('user', JSON.stringify(action.payload))

            state.user = action.payload
        },
        logout: (state) => {
            Cookies.remove('user')

            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer