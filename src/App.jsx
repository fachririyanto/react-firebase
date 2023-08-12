import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

import {
    AuthPage, ProtectedPage
} from './App/Routes'

import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Congratulation from './Pages/Congratulation'
import Dashboard from './Pages/Dashboard'

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route element={<AuthPage />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/congratulation" element={<Congratulation />} />
                    </Route>

                    <Route element={<ProtectedPage />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}