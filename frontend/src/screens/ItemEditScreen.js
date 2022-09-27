import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FormContainer } from '../components/FormContainer'
import { listItemDetails, deleteItem, updateItem } from '../actions/itemActions'
import { ITEM_UPDATE_RESET } from '../constants/itemConstants'


function ItemEditScreen() {

    const navigate = useNavigate();
    const itemId = useParams().id

    const [name, setName] = useState('')
    const [first_bid, setFirst_bid] = useState(0)
    const [buy_price, setBuy_price] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const itemDetails = useSelector(state => state.itemDetails)
    const { error, loading, item } = itemDetails

    const itemUpdate = useSelector(state => state.itemUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = itemUpdate

    const itemDelete = useSelector(state => state.itemDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = itemDelete

    useEffect(() => {
        console.log('hey')

        if (successUpdate) {
            dispatch({ type: ITEM_UPDATE_RESET })
            navigate('/sell')
        } else {
            if (!item.name || item._id !== Number(itemId)) {
                dispatch(listItemDetails(itemId))
            } else {
                setName(item.name)
                setFirst_bid(item.first_bid)
                setBuy_price(item.buy_price)
                setImage(item.image)
                setBrand(item.brand)
                setCategory(item.category)
                // setCountInStock(item.countInStock)
                setDescription(item.description)

            }
        }



    }, [dispatch, successUpdate, item])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateItem({
            _id: itemId,
            name,
            first_bid,
            buy_price,
            image,
            brand,
            category,
            // countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('item_id', itemId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/items/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    const deleteHandler = (id) => {
        dispatch({ type: ITEM_UPDATE_RESET })
        console.log(id)
        if(!item.saved)
        {
            if (window.confirm('Are you sure? This item will not be saved!')) {
                dispatch(deleteItem(id))
            }
        }
    }

    return (
        <div>
            <Link to='/sell' 
            className='btn btn-light my-3'
            onClick={() => deleteHandler(itemId)}
            >Go Back</Link>

            <FormContainer>
                <h1>Edit Item</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control required

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.Control type="file"
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                >

                                </Form.Control>
                                {uploading && <Loader />}

                            </Form.Group>


                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId='countinstock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter stock'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group> */}

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId='first_bid'>
                                <Form.Label>First Bid</Form.Label>
                                <Form.Control required

                                    type='number'
                                    placeholder='Enter first bid'
                                    value= {first_bid}
                                    onChange={(e) => setFirst_bid(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='buy_price'>
                                <Form.Label>Buyout Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter buy price'
                                    value={buy_price}
                                    onChange={(e) => setFirst_bid(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Update
                        </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ItemEditScreen