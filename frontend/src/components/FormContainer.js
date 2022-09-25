import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function RegisterFormContainer({ children }) {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={10}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

function LoginFormContainer({ children }) {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export { RegisterFormContainer, LoginFormContainer }