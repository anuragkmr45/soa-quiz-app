import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    return (
        <form action="#" className="flex flex-col items-center">
            <input
                className="input-ghost-secondary input w-full my-4"
                placeholder="Email"
                type='email'
            />
            <input
                className="input-ghost-secondary input w-full my-2"
                placeholder="Password"
                type="password"
            />
            <input
                className="input-ghost-secondary input my-2"
                placeholder="Confirm Password"
                type="password"
            />

            <button className="btn btn-secondary w-full mt-2">
                Login
            </button>

            <small className='text-black' >
                Not registered with us ?
                <Link to='/teacher-register' className='text-blue-600'>create now</Link>
            </small>
        </form>
    )
}

export default LoginForm
