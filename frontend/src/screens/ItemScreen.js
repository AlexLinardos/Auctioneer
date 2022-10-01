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
import { visit } from '../actions/otherActions';
import { getUserDetails } from '../actions/userActions';

import { useParams } from 'react-router-dom';

import Countdown from 'react-countdown';

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

    const itemVisit = useSelector(state => state.itemVisit)
    const {
        loading: loadingVisit,
        error: errorVisit,
        success: successVisit,
    } = itemVisit

    const userDetails = useSelector(state => state.userDetails)
    const { error2, loading2, user } = userDetails

    const { id } = useParams();

    const calculateTimeLeft = () => {
        var difference = Math.abs(new Date(item.ends) - new Date());
        // console.log(difference)


        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
              d: Math.floor(difference / (1000 * 60 * 60 * 24)),
              h: Math.floor((difference / (1000 * 60 * 60)) % 24),
              m: Math.floor((difference / 1000 / 60) % 60),
              s: Math.floor((difference / 1000) % 60)
            };
        }
        
        // console.log(timeLeft)
        return timeLeft;

    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = ['Closes in '];

    Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
        return;
    }

    timerComponents.push(
        <span>
            {timeLeft[interval]}{interval}{" "}
        </span>
    );
    });

    useEffect(() => {
        dispatch(listItemDetails(id))
        dispatch(getUserDetails('profile'))
    }, [])

    useEffect(() => {
        if (successItemBid) {
            dispatch({ type: ITEM_PLACE_BID_RESET })
        }

        if (item?._id && user?.userProfile?.id) {
            dispatch(visit(user?.userProfile?.id, item?._id))
        } else {
            dispatch(listItemDetails(id))
            dispatch(getUserDetails('profile'))
        }

    }, [dispatch, successItemBid, id, user])

    const submitHandler = (e) => {

        e.preventDefault()
        if (window.confirm('Are you sure you want to place a $' + ammount + ' bid for this item? This action cannot be reverted.')) {
            dispatch(placeItemBid(
                id, {
                ammount
            }
            ))
        }
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
            
        calculateTimeLeft()
    });

    const [rangeval, setRangeval] = useState(null);

    const sliderHandler = (e) => {
        setRangeval(e.target.value)
        console.log(rangeval);
        setAmmount((parseInt(item.currently) + (rangeval * 0.01 * item.first_bid)).toFixed(2))
        console.log(ammount);
    }

    // Random component
    // const Completionist = () => <span>You are good to go!</span>;

    // const renderer = ({ days, hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //       // Render a completed state
    //       return <Completionist />;
    //     } else {
    //       // Render a countdown
    //       return <span>Closes in {days}d {hours}h {minutes}m {seconds}s</span>;
    //     }
    //   };

    

    // console.log(item.categories[0].name)

    return (

        <div>
            
             {/* <Countdown 
                date={item.ends} 
                renderer={renderer}
             /> */}
            <Row id="myrow">
            <Col md={8}>
            <Button className='btn btn-light my-3' onClick={backHandler}>Go Back</Button>
            </Col>
            <Col id="ends" md={4}>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </Col>
            </Row>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : undefined ? <Message variant='danger'>{error}</Message>
                        :
                        <div>
                            <Row>
                                <Col md={8}>
                                    <Image src={item.image} alt={item.name} fluid />
                                        {/* <Row id='seller'>
                                            <Row id='seller1'>
                                                <h4 id='seller4'>Seller Information</h4>
                                            </Row>
                                            <Row id='seller2'>
                                                <Col>
                                                <ListGroup.Item>
                                                        <strong>{item.user.username}</strong>

                                                </ListGroup.Item>
                                                </Col>

                                            </Row>
                                        </Row> */}
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{item.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {item.description}
                                        </ListGroup.Item>

                                        

                                        <ListGroup.Item>

                                            Categories: <b> </b>
                                            {(item.categories?.slice(0, -1))?.map((category) => (
                                                <b key={category.id}>
                                                    {category.name},
                                                    <b> </b>
                                                </b>
                                            ))}
                                            {(item.categories?.slice(-1))?.map((category) => (
                                                <b key={category.id}>
                                                    {category.name}
                                                </b>
                                            ))}
                                            {/* Categories: {item.categories.all()[0]}
                                            {% for tag in book.tags.all %}
                                                {{ tag.name }}
                                                {% endfor %} */}


                                            {/* {(item.categorys).map((category) => (
                                                <b key={category.id}>
                                                    {category.name}
                                                </b>
                                            ))} */}

                                        </ListGroup.Item>

                                        {/* <ListGroup.Item>
                                            Starting bid: ${item.first_bid}
                                        </ListGroup.Item> */}

                                        

                                        {/* <ListGroup.Item>
                                            <b>Started: {String(item.started).substring(0, 10)}</b>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <b>Ends: {String(item.ends).substring(0, 10)}</b>
                                        </ListGroup.Item> */}

                                        {/* <ListGroup.Item>
                                            <strong>Seller: {item.user.id}</strong>
                                        </ListGroup.Item> */}

                                    </ListGroup>
                                </Col>

                                {/* <Col md={3}>
                                    
                                </Col> */}

                                <Col md={4}>
                                    
                                    <Card>
                                        <ListGroup variant="flush">
                                            {/* <ListGroup.Item>
                                                <Row>
                                                    <Col>Closes in:</Col>
                                                    <Col>
                                                        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item> */}
                                            {item.currently !== '0.00' ?
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Current Bid:</Col>
                                                    <Col>
                                                         <strong>${item.currently}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                             : ' '}
                                            {/* <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        <strong>{item.status}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item> */}



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
                                                            >First Bid for ${ammount}</Button>
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

                                                            <ListGroup.Item>
                                                                <h5>Latest Bids</h5>
                                                                
                                                                {item.number_of_bids > 0 ? (
                                                                <ListGroup variant='flush'>
                                                                    {(item.bids?.slice(-5).reverse())?.map((bid) => (
                                                                        <ListGroup.Item key={bid.id}>
                                                                            <Row>
                                                                                <Col>
                                                                                <small>{bid.name}</small>
                                                                                </Col>
                                                                                
                                                                                <Col>
                                                                                <small>{bid.time.substring(0, 10)}</small>
                                                                                </Col>

                                                                                <Col>
                                                                                <small>${bid.ammount}</small>
                                                                                </Col>
                                                                            </Row>
                                                                        </ListGroup.Item>
                                                                    ))}
                                                                    {/* <ListGroup.Item id='numbids'>
                                                                        <h5>{item.number_of_bids} Bids</h5>

                                                                    </ListGroup.Item> */}
                                                                </ListGroup>
                                                                ): 
                                                                <b>No bids placed</b>}
                                                            </ListGroup.Item>


                                                        </div>
                                                )) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to place a bid.</Message>
                                            )}
                                            
                                        </ListGroup>
                                        
                                    </Card>
                                    
                                    <Card id='seller-info'>
                                        <ListGroup>
                                        <ListGroup.Item>
                                            <h5 id='latest-bids4'>Seller Information</h5>
                                            <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row id='bids-row'>
                                                    <Col>
                                                    <strong>{item.user.username}</strong>
                                                    </Col>
                                                    
                                                    <Col>
                                                    <div>Country: {item.country}</div>
                                                    <div>Location: {item.location}</div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            </ListGroup>
                                        </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            {/* {
                                item.number_of_bids > 0 ? (
                                    <Row id='latest-bids'>
                                        <Row id='latest-bids1'>
                                            <h4 id='latest-bids4'>Latest Bids</h4>
                                        </Row>
                                        <Row id='latest-bids2'>
                                            {item.bids.length === 0 && <Message variant='info'>No bids</Message>}

                                            <ListGroup id='latest-bids3' variant='horizontal'>
                                                {(item.bids?.slice(-5))?.map((bid) => (
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
                            } */}
                        </div >

            }
        </div >
    );

}

export default ItemScreen