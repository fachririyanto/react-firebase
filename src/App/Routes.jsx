import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedPage = () => {
    const user = useSelector(state => state.auth.user)

    if (user) {
        return <Outlet />
    }

    return <Navigate to="/login" replace />
}

export const AuthPage = () => {
    const user = useSelector(state => state.auth.user)

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}