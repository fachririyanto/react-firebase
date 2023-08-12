import { Link } from 'react-router-dom'
import { Button } from '../Components/Button'

export default function Congratulation() {
    return (
        <div className="flex fixed inset-0 w-full h-full p-6 items-center justify-center">
            <div className="mx-auto w-full max-w-[340px]">
                <figure className="mx-auto max-w-[100px]">
                    <Link to="/">
                        <img loading="lazy" src="/vite.svg" alt="App Name" className="block w-full" />
                    </Link>
                </figure>
                <p className="mt-6 text-center">
                    <span className="font-semibold">Congratulation</span> to became a member! Please <Link to="/login" className="text-blue-500 underline">login</Link> to start your journey.
                </p>
                <p className="mt-6">
                    <Button type="link" className="mt-4" to="/login">Login</Button>
                </p>
            </div>
        </div>
    )
}