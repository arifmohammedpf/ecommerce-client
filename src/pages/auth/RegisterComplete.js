import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { wait } from '@testing-library/react'

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //validation
        if (!email || !password) {
            toast.error('Email and Password is required')
            return
        }
        else if (password.length < 6) {
            toast.error("Password must be atleast 6 character long")
            return
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                //remove user email from local storage
                window.localStorage.removeItem('emailForRegistration')
                //get user id token
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                //redux store

                //redirect
                history.push('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const completeRegisterForm = () => <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} autoFocus placeholder="Enter Password" />
        <br />
        <button type="submit" className="btn btn-raised">Register</button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h4>Register Complete</h4>
                    {completeRegisterForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
