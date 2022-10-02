import React, { useEffect } from 'react'
import { Image, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import globalStatus from '../globalStatus';
import { useDispatch, useSelector } from 'react-redux'

function changeStatus() {
    globalStatus.guest = true
}

function WelcomeScreen() {
    const RowStyling = {
        border: "2px solid black",
    }

    
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo && (globalStatus.guest === false)) {
            globalStatus.guest = false
        }
        
    
    }, [dispatch, userInfo])

    return (
        <div className='mt-4'>
            <Row style={RowStyling} className='pt-4' >
                <Col>
                    <Image className='pt-5' src='./images/gold_king_pig_2.jpg' alt='King Pig' fluid />
                </Col>

                <Col className='text-center mt-4'>
                    <h1>Welcome to Auctioneer</h1>
                    <h4>The <span style={{ color: 'goldenrod' }}>KING</span> of online auctions</h4>
                    <p className='pt-5'>Register with us and find the best deals from all over the globe!</p>

                    <LinkContainer to='/register'>
                        <Button type='submit' variant='primary' className='my-2'>Register</Button></LinkContainer>
                    <br></br>
                    <Row className='pt-5 pb-3 text-center'>
                        <Col>
                            Already have an account? <Link to='/login'>Sign in</Link>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <h4>OR</h4>
                    </Row>
                    <Row className='text-center'>
                        <Link to='/' onClick={changeStatus}>Continue as Guest</Link>
                    </Row>
                </Col>
            </Row >
        </div>
    )
}

export default WelcomeScreen