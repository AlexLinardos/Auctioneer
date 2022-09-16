import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormContainer from '../components/FormContainer';

function LoginScreen() {
    return (
        <FormContainer>
            <br></br>
            <h1 className='text-center'>Welcome to Auctioneer</h1>
            <br></br>
            <Form>
                <Form.Group controlId='email' className='my-4'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type='email' placeholder='Enter email address...'></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type='password' placeholder='Enter password...'></Form.Control>
                </Form.Group>

                <div className='my-4 text-center'>
                    <Button type='submit' variant='primary'>Sign In</Button>
                </div>
            </Form>

            <Row className='py-3 text-center'>
                <Col>
                    Don't have an account? <a href='#'>Register</a>
                    {/* <Link>Sign in</Link> */}
                </Col>
            </Row>
            <Row className='text-center'>
                <h4>OR</h4>
            </Row>
            <Row className='text-center'>
                <a href='#'>Continue as Guest</a>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen