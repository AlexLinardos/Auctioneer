import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
    return (
        <header>
            <Navbar bg='primary' variant='dark'>
                <Container>
                    <Navbar.Brand href="#home"><img src='./images/borderless_logo.png' alt='logo' height={120} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="flex-grow-1 justify-content-evenly">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>

                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>

                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header