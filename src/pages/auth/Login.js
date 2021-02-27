import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
    const [email, setEmail] = useState('arif.kme16cs012@gmail.com')
    const [password, setPassword] = useState('udemyecommerce')
    const [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                }
            })
            history.push('/')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setLoading(false)
        }

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
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

export default Login
