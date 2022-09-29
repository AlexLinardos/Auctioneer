import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button , Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FormContainer } from '../components/FormContainer'
import { listItemDetails, deleteItem, updateItem, listCategories } from '../actions/itemActions'
import { ITEM_UPDATE_RESET } from '../constants/itemConstants'
import TagsInput from "../components/TagsInput"
import CategoryInput from "../components/CategoryInput"
import Select from 'react-select'

const options = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Furniture', label: 'Furniture' }
  ]


function ItemEditScreen() {

    // const categoryList = useSelector(state => state.categoryList)
    // const { error1, loading1, categories } = categoryList

    const navigate = useNavigate();
    const itemId = useParams().id

    const [name, setName] = useState('')
    const [first_bid, setFirst_bid] = useState(0)
    const [buy_price, setBuy_price] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [categories, setCategories] = useState()
    // const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const itemDetails = useSelector(state => state.itemDetails)
    const { error, loading, item } = itemDetails

    const itemUpdate = useSelector(state => state.itemUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = itemUpdate

    const itemDelete = useSelector(state => state.itemDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = itemDelete
    
    // const selectedCategories = []
    //     item.categories?.forEach((x, i) => {
    //         console.log(x)
    //         selectedCategories.push(x.name)
    //     })
    //     console.log(selectedCategories)
    //     const selectedOptions = []
    //     options.forEach((x, i) => {
    //     console.log(x)
    //     if (selectedCategories.includes(x['value']))
    //     {
    //         selectedOptions.push(x)
    //     }
    //     });
    //     console.log(selectedOptions)
    //     setCategories(selectedOptions)

    useEffect(() => {
        console.log('hey', item.categories)
        if (successUpdate) {
            dispatch({ type: ITEM_UPDATE_RESET })
            navigate('/sell')
        } else {
            if ((!item.name || item._id !== Number(itemId)) && item.saved) {
                dispatch(listItemDetails(itemId))
            } else {
                setName(item.name)
                setFirst_bid(item.first_bid)
                setBuy_price(item.buy_price)
                setImage(item.image)
                setBrand(item.brand)
                setCategories(item.categories)
                // setCountInStock(item.countInStock)
                setDescription(item.description)

            }
        }



    }, [dispatch, successUpdate, item])

    function handleCategories(data){
        setCategories(data)
        // if (categories.includes(data))
        // {
        //     setCategories(categories.filter(category => category !== data))
        // }
        // else
        // { 
        //     setCategories(data)
        //     categories.forEach(function(entry) {
        //         console.log(entry);
        //     });
        // }   
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateItem({
            _id: itemId,
            name,
            first_bid,
            buy_price,
            image,
            brand,
            categories,
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
        if (!item.saved) {
            if (window.confirm('Are you sure? This item will not be saved!')) {
                dispatch(deleteItem(id))
            }
        }
    }

    return (
        
        <div>
            {/* <Row>
            {categories?.map(category => (
                <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
                    <b>{category.name}</b>
                </Col>
            ))}
          </Row> */}
            {/* <CategoryInput /> */}
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
                                    label='Choose File'
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

                            <Form.Group controlId='categories'>
                                <Form.Label>Categories</Form.Label>
                                <Select

                                    isMulti
                                    // name="categories"
                                    options={options}
                                    // className="basic-multi-select"
                                    // classNamePrefix="select"
                                    value={categories}
                                    onChange={handleCategories}
                                    isSearchable={true}
                                >
                                </Select>
                            </Form.Group>

                            <Form.Group controlId='first_bid'>
                                <Form.Label>First Bid</Form.Label>
                                <Form.Control required

                                    type='number'
                                    placeholder='Enter first bid'
                                    value={first_bid}
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
                                Submit
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>

    )
}

export default ItemEditScreen