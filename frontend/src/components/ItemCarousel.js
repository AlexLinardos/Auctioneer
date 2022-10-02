import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listHotItems } from '../actions/itemActions'

function ItemCarousel() {
    const dispatch = useDispatch()

    const itemHot = useSelector(state => state.itemHot)
    const { error, loading, items } = itemHot

    useEffect(() => {
        dispatch(listHotItems())
    }, [dispatch])

    return (loading ? <Loader />
        : error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel pause='hover' id='carousel'>
                    {items.map(item => (
                        <Carousel.Item key={item._id}>
                            <Link to={`/item/${item._id}`}>
                                <Image src={item.image} alt={item.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    {item.currently !== '0.00' && item.currently !==null ?
                                    <h4>{item.name} (${item.currently})</h4>
                                    : <h4>{item.name} (${item.first_bid})</h4>}
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )

    )
}

export default ItemCarousel
