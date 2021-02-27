import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success('Check your email for Password reset link')
            }).catch((err) => {
                setLoading(false)
                toast.error(err.message)
                console.log('Error msg in forgotpassword', err);
            })
    }

    return (
        <div>
            {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' autoFocus />
                <br />
                <button className='btn btn-raised' disabled={!email}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword