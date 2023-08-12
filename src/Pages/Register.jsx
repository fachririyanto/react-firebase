import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { firebaseAuth } from '../Utils/Firebase/Init'
import { Textbox } from '../Components/Form'
import { Button } from '../Components/Button'
import { Alert } from '../Components/Alert'

const db = getFirestore()

export default function Register() {
    const [formField, setFormField] = useState({
        email           : '',
        fullname        : '',
        password        : '',
        confirmPassword : '',
        isLoading       : false,
        isError         : false,
        error           : '',
    })

    const onChange = (e) => {
        const { name, value } = e.target

        setFormField({
            ...formField,
            [name]: value,
        })
    }

    const createUserDocument = async (user, args = {}) => {
        const userDocRef = doc(db, 'users', user.uid)
        const userSnapshots = await getDoc(userDocRef)
    
        if (!userSnapshots.exists()) {
            try {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    createdAt: new Date(),
                    ...args,
                })
            } catch (error) {
                return false
            }
        }
    
        return userSnapshots
    }

    const onRegister = (e) => {
        e.preventDefault()

        // prevent double click
        if (formField.isLoading) {
            return
        }

        if (formField.password !== formField.confirmPassword) {
            setFormField({
                ...formField,
                isError : true,
                error   : 'Password and Confirm Password must be same',
            })

            return
        }

        setFormField({
            ...formField,
            isLoading   : true,
            isError     : false,
            error       : '',
        })

        createUserWithEmailAndPassword(firebaseAuth, formField.email, formField.password)
            .then((userCredential) => {
                const user = userCredential.user

                const isSaved = createUserDocument(user, {
                    email       : formField.email,
                    fullname    : formField.fullname,
                })

                if (!isSaved) {
                    setFormField({
                        ...formField,
                        isLoading   : false,
                        isError     : true,
                        error       : 'Failed to save user data.',
                    })

                    return
                }

                isSaved.then(() => {
                    <Navigate to="/congratulation" />
                }).catch((error) => {
                    setFormField({
                        ...formField,
                        isLoading   : false,
                        isError     : true,
                        error       : error.message,
                    })
                })
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
                    Start a Journey
                </h1>

                { formField.isError ? <Alert type="error" message={ formField.error } /> : null }

                <form onSubmit={ onRegister }>
                    <p className="mb-3">
                        <Textbox
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={ formField.email }
                            onChange={ onChange }
                            required
                        />
                    </p>
                    <p className="mb-3">
                        <Textbox
                            type="text"
                            name="fullname"
                            placeholder="Full Name"
                            value={ formField.fullname }
                            onChange={ onChange }
                            required
                        />
                    </p>
                    <p className="mb-3">
                        <Textbox
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={ formField.password }
                            onChange={ onChange }
                            required
                        />
                    </p>
                    <p className="mb-3">
                        <Textbox
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={ formField.confirmPassword }
                            onChange={ onChange }
                            required
                        />
                    </p>
                    <p>
                        { formField.isLoading ? <Button type="button" disabled>Loading...</Button> : <Button type="submit">Register</Button> }
                    </p>
                    <p className="mt-4 text-center text-sm">
                        Have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}