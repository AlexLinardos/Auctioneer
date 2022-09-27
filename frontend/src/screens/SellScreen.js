import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
// import Paginate from '../components/Paginate'
import { listItems, deleteItem, createItem } from '../actions/itemActions'
import { ITEM_CREATE_RESET } from '../constants/itemConstants'

function SellScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const itemList = useSelector(state => state.itemList)
    const { loading, error, items, pages, page } = itemList

    const itemDelete = useSelector(state => state.itemDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = itemDelete

    const itemCreate = useSelector(state => state.itemCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, item: createdItem } = itemCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // const { id } = useParams();

    useEffect(() => {
        console.log('useEFFECT')
        dispatch({ type: ITEM_CREATE_RESET })

        // if (!userInfo.isAdmin) {
        //     history.push('/login')
        // }

        if (successCreate) {
            navigate(`/items/${createdItem._id}/edit`)
        } else {
            dispatch(listItems())
        }

    }, [dispatch, userInfo, successDelete, successCreate, createdItem])


    const deleteHandler = (id) => {
        console.log(id)

        if (window.confirm('Are you sure you want to delete this Item?')) {
            dispatch(deleteItem(id))
        }
    }

    const createItemHandler = () => {
        dispatch(createItem())
    }

    return (
        <div>
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

            {loadingDelete && <Loader />}
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
                                        <th>FIRST BID</th>
                                        <th>CURRENTLY</th>
                                        <th>STATUS</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {items.filter(item => item.user==userInfo.id).map(item => (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td><Link to={`/items/${item._id}`} style={{ textDecoration: 'none' }}>{item.name}</Link></td>
                                            
                                            <td>${item.first_bid}</td>
                                            {item.currently ? <td>${item.currently}</td> :<td></td>}
                                            <td>{item.status}</td>

                                            <td>
                                                <LinkContainer to={`/items/${item._id}/edit`}>
                                                    <Button variant='light' 
                                                    className='btn-sm'
                                                    disabled={item.status=='Active'}
                                                    ><i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' 
                                                className='btn-sm' 
                                                onClick={() => deleteHandler(item._id)}
                                                disabled={item.status=='Active'}
                                                ><i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
                        </div>
                    )}
        </div>
    )
}

export default SellScreen