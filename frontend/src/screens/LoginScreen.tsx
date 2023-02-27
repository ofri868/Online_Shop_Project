import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProfileAsync, logInAsync, selectLogged, selectToken } from '../slicers/authSlice';
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap';
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
        if (logged) {
            navigate('/')
            dispatch(getProfileAsync(myToken))
        }
    }, [logged, navigate, dispatch])

    const handleLogin = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        dispatch(logInAsync({ username, password }))
    }
    return (
        <div>
            <h1>Log in</h1>
            <div className='d-flex justify-content-center'>
            <Form onSubmit={handleLogin}>
                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label className="d-flex flex-row bd-highlight">Username:</Form.Label>
                        <Form.Control onChange={(e) => setUsername(e.target.value)} style={{ width: '200px' }} type="text" />
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridDescription">
                        <Form.Label className="d-flex flex-row bd-highlight">Password:</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type='password' style={{ width: '200px' }}/>
                    </Form.Group>
                </Row>
                <div className='mb-3'>
                {username === '' || password === '' ?
                    <Button variant="primary" type="submit" disabled>
                        Log in
                    </Button> :
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                }
                </div>
            </Form>
            </div>
            Not a memeber yet? <Link to="/register">Sign up</Link>
        </div>
    )
}

export default LoginScreen