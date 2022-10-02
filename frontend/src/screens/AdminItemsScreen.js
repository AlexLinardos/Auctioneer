import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getItemsXML } from '../actions/otherActions';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FormContainer } from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function AdminItemsScreen() {
    const itemsXML = useSelector(state => state.itemsXML)
    const { loading, error } = itemsXML
    const dispatch = useDispatch()
    const [uploading, setUploading] = useState(false)
    const [XMLfile, setXMLFile] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        console.log("dispatched")
        dispatch(getItemsXML())
    }, [dispatch])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('XMLfile', file)

        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post('/api/XMLimport/', formData, config)
            setXMLFile(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <FormContainer>
                            <Link to="/Items.xml" target="_blank" download><i className='fas fa-download'></i> Export XML</Link>
                            <Form>
                                <Form.Group controlId='image'>
                                    <Form.Label>Import XML</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter XML file'
                                        value={XMLfile}
                                        onChange={(e) => setXMLFile(e.target.value)}
                                    >
                                    </Form.Control>

                                    <Form.Control type="file"
                                        label='Choose File'
                                        onChange={uploadFileHandler}
                                    >
                                    </Form.Control>
                                    {uploading && <Loader />}

                                </Form.Group>
                            </Form>
                        </FormContainer>
                    </div>}
        </div>
    )
}

export default AdminItemsScreen