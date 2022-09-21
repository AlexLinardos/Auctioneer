import React, { useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import AuthContext from '../contexts/AuthContext';

function LoginScreen() {
    let { loginUser } = useContext(AuthContext)

    return (
        <FormContainer>
            <br></br>
            <h1 className='text-center'>Welcome to Auctioneer</h1>
            <br></br>
            <Form onSubmit={loginUser}>
                <Form.Group controlId='email' className='my-4'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type='email' placeholder='Enter your email address...' name='email'></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter your password...' name='password'></Form.Control>
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
                <Link to='/'>Continue as Guest</Link>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen