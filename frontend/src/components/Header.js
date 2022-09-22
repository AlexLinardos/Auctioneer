import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return (
        <header>
            <Navbar bg='primary' variant='dark'>
                <Container>

                    <LinkContainer to='/'>
                        <Navbar.Brand><img src='./images/borderless_logo.png' alt='logo' height={120} /></Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-grow-1 justify-content-evenly">

                            <LinkContainer to='/'>
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to='/link'>
                                <Nav.Link>Link</Nav.Link>
                            </LinkContainer>

                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                
                                <LinkContainer to='/action/3.1'>
                                    <NavDropdown.Item>
                                        Action
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/action/3.2'>
                                    <NavDropdown.Item>
                                        Another action
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/action/3.3'>
                                    <NavDropdown.Item>
                                        Something
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Divider />

                                <LinkContainer to='/action/3.4'>
                                    <NavDropdown.Item>
                                        Separated link
                                    </NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header