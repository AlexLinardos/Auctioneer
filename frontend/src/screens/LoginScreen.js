import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Message from '../components/Message';
import { login } from '../actions/userActions';
import { LoginFormContainer } from '../components/FormContainer';
import globalStatus from '../globalStatus'

function LoginScreen() {

    function changeStatus() {
        globalStatus.guest = true
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
            globalStatus.guest = false
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))

    }

    return (
        <LoginFormContainer>
            <br></br>
            <h1 className='text-center'>Welcome to Auctioneer</h1>
            <br></br>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='username' className='my-4'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type='text' placeholder='Enter your username...'
                        value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter your password...'
                        value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <div className='my-4 text-center'>
                    <Button type='submit' variant='primary'>Submit</Button>
                </div>
            </Form>

            <Row className='py-3 text-center'>
                <Col>
                    Don't have an account? <Link to='/register'>Register</Link>
                </Col>
            </Row>
            <Row className='text-center'>
                <h4>OR</h4>
            </Row>
            <Row className='text-center'>
                <Link to='/' onClick={changeStatus}>Continue as Guest</Link>
            </Row>
        </LoginFormContainer>
    )
}

export default LoginScreen