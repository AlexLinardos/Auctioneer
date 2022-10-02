import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getItemsXML } from '../actions/otherActions';
import Loader from '../components/Loader'
import Message from '../components/Message'

function AdminItemsScreen() {
    const itemsXML = useSelector(state => state.itemsXML)
    const { loading, error } = itemsXML
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("dispatched")
        dispatch(getItemsXML())
    }, [dispatch])

    return (
        <div>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Link to="/Items.xml" target="_blank" download><i className='fas fa-download'></i> Export XML</Link>}
        </div>
    )
}

export default AdminItemsScreen