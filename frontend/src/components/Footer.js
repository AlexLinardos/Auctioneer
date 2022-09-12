import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-r'>Copyright &copy; DI-Duo</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer