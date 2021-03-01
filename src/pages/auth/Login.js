import React, { useEffect, useState } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth'

const Login = ({ history }) => {
    const [email, setEmail] = useState('arif.kme16cs012@gmail.com')
    const [password, setPassword] = useState('udemyecommerce')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (user && user.token) {
            history.push('/')
        }
    }, [user])

    let dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

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
            history.push('/')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }

    }

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult()
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
                history.push('/')
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message)
            })
    }

    const loginForm = () =>
        <form onSubmit={handleSubmit}>
            <div className="form-group"><input type="email" className="form-control" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} autoFocus /></div>
            <div className="form-group"><input type="password" className="form-control" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} /></div>

            <br />
            <Button onClick={handleSubmit} type='submit' className='mb-3' block shape='round' icon={<MailOutlined />} size="large" disabled={!email || password.length < 6}>Login with Email/Password</Button>
        </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-3">
                    {loading ? (<h4 className='text-danger'>Loading...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}
                    <Button onClick={googleLogin} type='submit' className='mb-3' block shape='round' icon={<GoogleOutlined />} size="large">Login with Google</Button>
                    <Link to="/forgot/password" className="text-danger">Forgot Password</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
