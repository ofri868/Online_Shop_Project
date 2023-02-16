import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logInAsync, registerAsync, selectLogged, selectToken } from '../slicers/authSlice';
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap';

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
            <div className='d-flex justify-content-center'>
            <Form onSubmit={handleRegister}>
                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridUsername">
                        <Form.Label className="d-flex flex-row bd-highlight">Username:</Form.Label>
                        <Form.Control onChange={(e) => setUsername(e.target.value)} style={{ width: '200px' }} type="text" />
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label className="d-flex flex-row bd-highlight">Password:</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type='password' style={{ width: '200px' }}/>
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className="d-flex flex-row bd-highlight">Email:</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type='email' style={{ width: '200px' }}/>
                    </Form.Group>
                </Row>
                <div className='mb-3'>
                {username === '' || password === '' || email === '' ?
                    <Button variant="primary" type="submit" disabled>
                        Sign up
                    </Button> :
                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                }
                </div>
            </Form>
            </div>
            Already a memeber? <Link to="/register">Log in</Link>
        </div>
    )
}

export default RegisterScreen