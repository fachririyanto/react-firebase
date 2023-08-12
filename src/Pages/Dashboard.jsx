import { useEffect, useState } from 'react'
import { redirect, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { logout } from '../App/Reducers/Auth'
import { Button } from '../Components/Button'

const db = getFirestore()

export default function Dashboard() {
    const [userDoc, setUserDoc] = useState({
        email       : '',
        fullname    : '',
    })

    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const getUser = async (uid) => {
        const userDocRef = doc(db, 'users', uid)
        const userSnapshots = await getDoc(userDocRef)

        return userSnapshots.data()
    }

    useEffect(() => {
        getUser(user.uid)
            .then((userDoc) => {
                setUserDoc({
                    email       : userDoc.email,
                    fullname    : userDoc.fullname,
                })
            })
    }, [user])

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
                <h1 className="mt-4 mb-6 text-3xl font-semibold text-center">
                    Welcome to Dashboard
                </h1>
                <p className="mt-6 text-center">
                    Hello, <span className="font-semibold">{ userDoc.fullname }</span>
                </p>
                <p className="mt-6">
                    <Button onClick={ onLogout }>Logout</Button>
                </p>
            </div>
        </div>
    )
}