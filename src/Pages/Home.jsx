import { Link, redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../App/Reducers/Auth'
import { Button } from '../Components/Button'

export default function Home() {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch( logout() )

        return redirect( '/login' )
    }

    return (
        <div className="flex fixed inset-0 w-full h-full p-6 items-center justify-center">
            <div className="mx-auto w-full max-w-[340px]">
                <figure className="mx-auto max-w-[100px]">
                    <Link to="/">
                        <img loading="lazy" src="/vite.svg" alt="App Name" className="block w-full" />
                    </Link>
                </figure>
                <header className="mt-10 text-center">
                    <h1 className="font-medium text-[40px] leading-none">
                        React x Firebase
                    </h1>
                </header>
                { user ? (
                    <p className="mt-10 mx-auto max-w-[320px] text-center">
                        <Button type="link" to="/dashboard">Dashboard</Button>
                        <Button onClick={ onLogout } className="mt-4 bg-red-500">Logout</Button>
                    </p>
                ) : (
                    <p className="mt-10 mx-auto max-w-[320px] text-center">
                        <Button type="link" to="/login">Login</Button>
                        <Button type="link" to="/register" className="mt-4">Register</Button>
                    </p>
                ) }
                <p className="mt-6 text-center">
                    Fork me on <Link to="https://github.com/fachririyanto/react-firebase"><span className="font-semibold">Github</span>.</Link>
                </p>
            </div>
        </div>
    )
}