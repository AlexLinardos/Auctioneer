import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Bid from '../components/Bid'
import Loader from '../components/Loader'
import Message from '../components/Message'
import globalStatus from '../globalStatus'

import { listItemDetails, placeItemBid } from '../actions/itemActions'
import { ITEM_PLACE_BID_RESET } from '../constants/itemConstants'

import { useParams } from 'react-router-dom';

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function ItemScreen() {
    const [ammount, setAmmount] = useState(0)

    const dispatch = useDispatch()

    const itemDetails = useSelector(state => state.itemDetails)
    const { loading, error, item } = itemDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const itemBidPlace = useSelector(state => state.itemBidPlace)
    const {
        loading: loadingItemBid,
        error: errorItemBid,
        success: successItemBid,
    } = itemBidPlace

    const { id } = useParams();

    useEffect(() => {
        if (successItemBid) {
            dispatch({ type: ITEM_PLACE_BID_RESET })
        }
        dispatch(listItemDetails(id))

    }, [dispatch, successItemBid, id])



    const submitHandler = (e) => {

        e.preventDefault()
        dispatch(placeItemBid(
            id, {
            ammount
        }
        ))
    }

    const backHandler = () => {
        dispatch({ type: ITEM_PLACE_BID_RESET })
        window.history.go(-1)
    }

    docReady(function () {
        if (item.number_of_bids == 0) {
            setAmmount(parseFloat(item.first_bid))
        }
        else if (rangeval == null)
            setAmmount(0)

    });

    const [rangeval, setRangeval] = useState(null);

    const sliderHandler = (e) => {
        setRangeval(e.target.value)
        console.log(rangeval);
        setAmmount((parseInt(item.currently) + (rangeval * 0.01 * item.first_bid)).toFixed(2))
        console.log(ammount);
    }

    return (

        <div>
            <Button className='btn btn-light my-3' onClick={backHandler}>Go Back</Button>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : undefined ? <Message variant='danger'>{error}</Message>
                        :
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={item.image} alt={item.name} fluid />
                                </Col>

                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{item.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            1st bid: ${item.first_bid}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {item.description}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <small>Started: {String(item.started).substring(0, 10)}</small>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <small>Ends: {String(item.ends).substring(0, 10)}</small>
                                        </ListGroup.Item>

                                        {/* <ListGroup.Item>
                                            <strong>Seller: {item.user.id}</strong>
                                        </ListGroup.Item> */}

                                    </ListGroup>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Currently:</Col>
                                                    <Col>
                                                        {item.currently ? <strong>${item.currently}</strong> : ' '}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        <strong>{item.status}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>



                                            {userInfo ? (
                                                userInfo.id == item.user ? ' ' : (

                                                    item.number_of_bids == 0 ? (
                                                        <ListGroup.Item>
                                                            <Button id='myButton'
                                                                className='btn-block'
                                                                type='submit'
                                                                disabled={loadingItemBid}
                                                                // variant='primary'
                                                                onClick={submitHandler}
                                                            >First Bid for ${item.first_bid}</Button>
                                                        </ListGroup.Item>
                                                    ) :

                                                        <div>
                                                            <ListGroup.Item>
                                                                <h4>Bid ammount</h4>
                                                                <div className="slidecontainer">
                                                                    <input type="range" min="1" max="100" defaultValue="1" step="1" className="slider" id="myRange"
                                                                        onChange={sliderHandler} />
                                                                    <div id="slider-value">{rangeval}%</div>

                                                                    <div className="test">
                                                                        <input type="text" className="input_text" disabled={true}
                                                                            value={ammount} size="6"
                                                                        ></input>
                                                                    </div>
                                                                </div>
                                                            </ListGroup.Item>
                                                            {loadingItemBid && <Loader />}
                                                            {successItemBid && <Message variant='success'>Bid Placed</Message>}
                                                            {errorItemBid && <Message variant='danger'>{errorItemBid}</Message>}
                                                            <ListGroup.Item>
                                                                <Button id='myButton'
                                                                    className='btn-block'
                                                                    type='submit'
                                                                    disabled={loadingItemBid}
                                                                    variant='primary'
                                                                    onClick={submitHandler}
                                                                >Place Bid</Button>
                                                            </ListGroup.Item>

                                                            {item.buy_price == 0 ? ' ' : (
                                                                <ListGroup.Item id="buyout">
                                                                    <Button id='myButton'
                                                                        className='btn-block'
                                                                        type='submit'
                                                                        disabled={loadingItemBid}
                                                                    // onClick={buyoutHandler}
                                                                    >Buy Now for ${item.buy_price}</Button>
                                                                </ListGroup.Item>
                                                            )}


                                                        </div>
                                                )) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to place a bid.</Message>
                                            )}
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            {
                                item.number_of_bids > 0 ? (
                                    <Row id='latest-bids'>
                                        <Row id='latest-bids1'>
                                            <h4 id='latest-bids4'>Latest Bids</h4>
                                        </Row>
                                        <Row id='latest-bids2'>
                                            {/* {item.bids.length === 0 && <Message variant='info'>No bids</Message>} */}

                                            <ListGroup id='latest-bids3' variant='horizontal'>
                                                {(item.bids.slice(-5)).map((bid) => (
                                                    <ListGroup.Item key={bid.id}>
                                                        <h5>{bid.name}</h5>
                                                        <strong>${bid.ammount}</strong>
                                                        <Row><small>{bid.time.substring(0, 10)}</small></Row>
                                                    </ListGroup.Item>
                                                ))}
                                                <ListGroup.Item id='numbids'>
                                                    <h5>{item.number_of_bids} Bids</h5>

                                                </ListGroup.Item>
                                            </ListGroup>

                                        </Row>
                                    </Row>
                                ) : ' '
                            }
                        </div >

            }
        </div >
    );

}

export default ItemScreen