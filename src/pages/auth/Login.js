import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.table(email, password)

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
