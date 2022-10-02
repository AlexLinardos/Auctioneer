import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import SearchBox from './SearchBox';
import Categories from './Categories';
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
                    <LinkContainer to='/' className="navbar-brand">
                        <Navbar.Brand id='brand'>
                            <Row><img src='/images/logo.png' alt='logo' id='logo'/></Row>
                            <Row><span id="logo-text">auctioneer</span></Row>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="flex-grow-1 justify-content-evenly">

                            <Categories/>
                            {/* <LinkContainer to='/Categories'>
                                <Nav.Link>Categories</Nav.Link>
                            </LinkContainer> */}

                            <SearchBox/>

                            <LinkContainer to='/sell'>
                                <Nav.Link>Sell</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.username} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/won'>
                                        <NavDropdown.Item>Won Auctions</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/sold'>
                                        <NavDropdown.Item>Sold Items</NavDropdown.Item>
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


                            {
                                (() => {
                                    if (!userInfo) {
                                        return (<Nav className="mr-auto text-center">
                                            Guest User<br></br>Log in to take part <br></br>in auctions
                                        </Nav>)
                                    }
                                })()
                            }

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/itemslist'>
                                        <NavDropdown.Item>Items</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header