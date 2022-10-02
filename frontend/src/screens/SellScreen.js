import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Image, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listItems, deleteItem, createItem, updateItem } from '../actions/itemActions'
import { ITEM_CREATE_RESET } from '../constants/itemConstants'
import { add } from 'date-fns'
import globalStatus from '../globalStatus'

function SellScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const itemList = useSelector(state => state.itemList)
    const { loading, error, items, pages, page } = itemList

    const itemDelete = useSelector(state => state.itemDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = itemDelete

    const itemCreate = useSelector(state => state.itemCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, item: createdItem } = itemCreate

    const itemUpdate = useSelector(state => state.itemUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = itemUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [ends, setEnds] = useState();
    const [itemId, setItemId] = useState();

    // const { id } = useParams();

    let keyword = window.location.search;
    useEffect(() => {
        dispatch({ type: ITEM_CREATE_RESET })
        if (successCreate) {
            navigate(`/items/${createdItem._id}/edit`)
        } else if (!userInfo && (globalStatus.guest === false)) {
            console.log('hey')
            navigate('/welcome')
        }
        else {
            
            dispatch(listItems(keyword, 'flag=Sell'))
        }

    }, [dispatch, userInfo, successDelete, successCreate, successUpdate, createdItem, keyword])


    const deleteHandler = (id) => {
        console.log(id)

        if (window.confirm('Are you sure you want to delete this Item?')) {
            dispatch(deleteItem(id))
        }
    }

    const dateHandler = (id) => {
        console.log(id)

        setItemId(id);
        console.log(itemId)
        setShow(true);
    }

    const activateHandler = () => {
        setShow(false);
        console.log(ends)

        dispatch(updateItem({
            _id: itemId,
            status: 'Active',
            started: new Date(),
            ends: new Date(ends)
        }))
        console.log('update sent')
        

        // if (window.confirm('Are you sure you want to activate this Auction?')) {
        //     dispatch(updateItem({
        //         _id: itemId,
        //         status: 'Active',
        //         started: new Date(),
        //         ends: new Date(ends)
        //     }))
        //     console.log('update sent')
        // }
    }

    const concludeHandler = (id) => {
        console.log(id)

        // dispatch(updateItem({
        //     _id: id,
        //     status: 'Concluded'
        // }))

        if (window.confirm('Are you sure you want to conclude this Auction?')) {
            dispatch(updateItem({
                _id: id,
                status: 'Concluded'
            }))
        }
    }

    const createItemHandler = () => {
        dispatch(createItem())
    }

    const tomorrowFns = add(new Date(),{
        days: 1
      })

    return (
        
        <div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Auction End Date</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            {/* <Form.Group controlId='date'> */}
                                <Form.Label>Ends</Form.Label>
                                    <Form.Control

                                        type='date'
                                        placeholder='Enter End Date'
                                        value={ends}
                                        onChange={(e) => setEnds(e.target.value)}
                                        min = {tomorrowFns.toISOString().slice(0, 10)}
                                        required
                                    >
                                    </Form.Control>
                            {/* </Form.Group> */}
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={activateHandler} disabled={ends==null}>
                        Start Auction
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className='align-items-center'>
                <Col>
                    <h1>My Auctions</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createItemHandler}>
                        <i className='fas fa-plus'></i> Add Item
                    </Button>
                </Col>
            </Row>

            {/* {loadingDelete && <Loader />} */}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>STARTING BID</th>
                                        <th>CURRENT BID</th>
                                        <th>STATUS</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.map(item => (
                                        <tr key={item._id}>
                                            {/* <td id='img-cont'><Image src={item.image} alt={item.name} fluid rounded /></td> */}
                                            <td>{item._id}</td>
                                            <td><Link to={`/items/${item._id}`} style={{ textDecoration: 'none' }}>{item.name}</Link></td>
                                            
                                            <td>${item.first_bid}</td>
                                            {item.currently ? <td>${item.currently}</td> :<td>No Bids</td>}
                                            <td>{item.status}</td>

                                            <td className='action-container'>
                                                {item.status=='Active' ? 
                                                <Button variant='secondary' 
                                                    className='btn-sm'
                                                    onClick={() => concludeHandler(item._id)}
                                                    disabled={item.number_of_bids==0}
                                                    ><i className="fa-solid fa-gavel fa-lg"></i>
                                                </Button>
                                                :
                                                <Button variant='secondary' 
                                                    className='btn-sm'
                                                    onClick={() => dateHandler(item._id)}
                                                    ><i className="fa-solid fa-play fa-lg"></i>
                                                </Button>
                                                }

                                                <LinkContainer to={`/items/${item._id}/edit`}>
                                                    <Button variant='light' 
                                                    className='btn-sm'
                                                    disabled={item.status=='Active'}
                                                    ><i className='fas fa-edit fa-lg'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' 
                                                    className='btn-sm' 
                                                    onClick={() => deleteHandler(item._id)}
                                                    disabled={item.status=='Active'}
                                                    ><i className='fas fa-trash fa-lg'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} sellScreen={true} />
                        </div>
                    )}
        </div>
    )
}

export default SellScreen