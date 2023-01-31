import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logInAsync, registerAsync, selectLogged, selectToken } from '../slicers/authSlice';
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const logged = useAppSelector(selectLogged)
    const myToken = useAppSelector(selectToken)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (logged) {
            if (myToken === '') {
                dispatch(logInAsync({ username, password }))
                console.log(myToken)
            }
            navigate('/shop')
        }
    }, [logged, myToken, navigate])


    const handleRegister = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        dispatch(registerAsync({ username, password, email }))
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleRegister}>
                Username: <input onChange={(e) => setUsername(e.target.value)} type="text" /><br />
                Password: <input onChange={(e) => setPassword(e.target.value)} type="password" /><br />
                Email: <input onChange={(e) => setEmail(e.target.value)} type="email" /><br />
                <button>Sign up</button><br />
                Already a memeber? <Link to="/login">Log in</Link>
            </form>
        </div>
    )
}

export default RegisterScreen