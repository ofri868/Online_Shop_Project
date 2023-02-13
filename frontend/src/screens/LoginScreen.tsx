import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProfileAsync, logInAsync, selectLogged, selectToken } from '../slicers/authSlice';
import {Link, useNavigate} from 'react-router-dom'
const LoginScreen = () => {
    // const username = useAppSelector(selectUname);
    // const password = useAppSelector(selectPword);
    // const myToken = useAppSelector(selectToken);
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const logged = useAppSelector(selectLogged)
    const myToken = useAppSelector(selectToken)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(logged){
            navigate('/shop')
            dispatch(getProfileAsync(myToken))
        }
    }, [logged, navigate])
    
    const handleLogin = (event: { preventDefault: () => void; })=>{
        event.preventDefault();
        dispatch(logInAsync({username, password}))
    }
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                Username: <input onChange={(e)=> setUsername(e.target.value)} type="text" /><br/>
                Password: <input onChange={(e)=> setPassword(e.target.value)} type="password" /><br/>
                <button >Log in</button><br/>
            </form>
            Not a memeber yet? <Link to="/register">Sign up</Link>
        </div>
    )
}

export default LoginScreen