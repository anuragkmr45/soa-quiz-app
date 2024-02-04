import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import apiEndpoints from '../../../services/api';
import { showSuccessToast, showErrorToast } from '../../../components/tosters/notifications'

const LoginForm = () => {

    // reg email and pass
    // aayush@soa.ac.in
    // aayush1234
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');

    const navigate = useNavigate();

    const handleEmailLogin = async () => {

        if (email.endsWith('@soa.ac.in')) {
            try {
                setLoading(true)
                const res = await apiEndpoints.teacher.login({ email, password });

                const newToken = res.data.token;
                localStorage.setItem('authToken', newToken);

                setLoading(false)
                showSuccessToast(`Login Succesfully`)

                if (res.status === 200) {
                    navigate('/dashboard');
                }

            } catch (error) {
                console.error("Email sign-in error:", error);
                setLoading(false)
                showErrorToast("Email and password not matching")
            }
        } else {
            console.error('Email must end with "@soa.ac.in"');
            showErrorToast("Only College Email is applicable")
        }
    };

    return (
        <aside className="flex flex-col items-center">
            <input
                className="input-ghost-secondary input my-2 max-w-full text-secondary"
                placeholder="Email"
                type='email'
                value={email}
                onChange={(value) => { setEmail(value.target.value) }}
            />
            <input
                className="input-ghost-secondary input  my-2 max-w-full text-secondary"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(value) => { setPassword(value.target.value) }}
            />

            {
                loading ? (
                    <button
                        className="btn btn-secondary w-full mt-2"
                    >
                        Loading ...
                    </button>
                ) : (
                    <button
                        className="btn btn-secondary w-full mt-2"
                        onClick={handleEmailLogin}
                    >
                        Login
                    </button>
                )
            }

            <small className='text-black' >
                Not registered with us ?
                <Link to='/teacher-register' className='text-blue-600'>create now</Link>
            </small>
        </aside>
    )
}

export default LoginForm
