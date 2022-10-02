import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown, Modal, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Categories() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const [keyword, setKeyword] = useState('')

    // const navigate = useNavigate()

    // // let history = useHistory()
    // useEffect(() => {
    //     console.log(show)
    // }, [show])

    const clickHandler = (e) => {
        e.preventDefault()
        // console.log('here')
        setShow(true);
        
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Categories</Modal.Title>
                </Modal.Header>
            <Row>
                <Col>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                    <Button>
                        Start Auction
                    </Button>
                </Col>
            </Row>         
            </Modal>
            <LinkContainer to='/Categories'
            onClick={clickHandler}>
                <Nav.Link>
                    Categories
                </Nav.Link>
            </LinkContainer>
        </div>
    )
}

export default Categories

// <Form id='form1' onSubmit={submitHandler} inline="true">
        //     <Form.Control
        //         type='text'
        //         name='q'
        //         onChange={(e) => setKeyword(e.target.value)}
        //         className='mr-sm-2 ml-sm-5'
        //     ></Form.Control>

        //     <Button
        //         type='submit'
        //         variant='outline-secondary'
        //         className='p-2'
        //     >
        //         Search
        //     </Button>
        // </Form>
