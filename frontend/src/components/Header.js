import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/userActions';

function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg='primary' variant='dark'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><Image src='./images/logo_auctioneer.png' alt='logo' height={100} /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-grow-1 justify-content-evenly">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>

                            {userInfo ? (
                                <NavDropdown title={userInfo.username} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <Nav className="mr-auto">
                                    <LinkContainer to='/login'>
                                        <Nav.Link>Login <i className='fas fa-user'></i></Nav.Link>
                                    </LinkContainer>
                                </Nav>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header