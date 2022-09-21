import React, { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { LinkContainer } from 'react-router-bootstrap';

import AuthContext from '../contexts/AuthContext';

function Header() {
    let { userInfo, logoutUser } = useContext(AuthContext)

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

                                    <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>

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