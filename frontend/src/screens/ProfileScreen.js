import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants';
import AuthContext from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

function ProfileScreen() {
    let { userInfo } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails
    console.log(user)

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ 'name': name, 'email': email, 'password': password }))
            setMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type='name' placeholder='Enter name' value={userInfo.name} onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type='email' placeholder='Enter Email' value={userInfo.email} onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileScreen