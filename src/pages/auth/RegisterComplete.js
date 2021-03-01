import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth'

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user } = useSelector((state) => ({ ...state }))
    let dispatch = useDispatch()

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
                console.log('user', user, 'idTokenResult', idTokenResult);

                createOrUpdateUser(idTokenResult.token) //auth check backend function
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            }
                        })
                    })
                    .catch(err => console.log(err))

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
        <button type="submit" className="btn btn-raised bg-secondary text-white">Register</button>
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
