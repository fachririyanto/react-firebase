import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../Utils/Firebase/Init'
import { login } from '../App/Reducers/Auth'
import { Textbox } from '../Components/Form'
import { Button } from '../Components/Button'
import { Alert } from '../Components/Alert'

export default function Login() {
    const [formField, setFormField] = useState({
        email       : '',
        password    : '',
        isLoading   : false,
        isError     : false,
        error       : '',
    })

    const onChange = (e) => {
        const { name, value } = e.target

        setFormField({
            ...formField,
            [name]: value,
        })
    }

    const dispatch = useDispatch()

    const onLogin = (e) => {
        e.preventDefault()

        // prevent double click
        if (formField.isLoading) {
            return
        }

        setFormField({
            ...formField,
            isLoading   : true,
            isError     : false,
            error       : '',
        })

        signInWithEmailAndPassword(firebaseAuth, formField.email, formField.password)
            .then((userCredential) => {
                const user = userCredential.user
                
                dispatch(login({
                    uid: user.uid,
                }))
            })
            .catch((error) => {
                setFormField({
                    ...formField,
                    isLoading   : false,
                    isError     : true,
                    error       : error.message,
                })
            })
    }

    return (
        <div className="flex fixed inset-0 w-full h-full p-6 items-center justify-center">
            <div className="mx-auto w-full max-w-[340px]">
                <figure className="mx-auto max-w-[100px]">
                    <Link to="/">
                        <img loading="lazy" src="/vite.svg" alt="App Name" className="block w-full" />
                    </Link>
                </figure>

                <h1 className="mt-4 mb-6 text-3xl font-semibold text-center">
                    Welcome Back
                </h1>

                { formField.isError ? <Alert type="error" message={ formField.error } /> : null }

                <form onSubmit={ onLogin }>
                    <p className="mb-3">
                        <Textbox
                            type="email"
                            name="email"
                            className="block w-full h-11 border border-gray-400 rounded-lg bg-white px-3"
                            placeholder="Email"
                            value={ formField.email }
                            onChange={ onChange }
                            required
                        />
                    </p>
                    <p className="mb-3">
                        <Textbox
                            type="password"
                            name="password"
                            className="block w-full h-11 border border-gray-400 rounded-lg bg-white px-3"
                            placeholder="Password"
                            value={ formField.password }
                            onChange={ onChange }
                            required
                        />
                    </p>
                    <p>
                        { formField.isLoading ? <Button type="button" disabled>Loading...</Button> : <Button type="submit">Login</Button> }
                    </p>
                    <p className="mt-4 text-center text-sm">
                        Don't have an account? <Link to="/register" className="text-blue-500 underline">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}