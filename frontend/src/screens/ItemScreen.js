import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Bid from '../components/Bid'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listItemDetails, placeItemBid } from '../actions/itemActions'
import { ITEM_PLACE_BID_RESET } from '../constants/itemConstants'

import { useParams } from 'react-router-dom';

function ItemScreen({ }) {
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
            setAmmount(0)
            dispatch({ type: ITEM_PLACE_BID_RESET })
        }
        dispatch(listItemDetails(id))


    }, [dispatch, successItemBid, id])

    const submitHandler = (e) => {

        e.preventDefault()
        console.log(id)
        dispatch(placeItemBid(
            id, {
            ammount
        }
        ))
    }

    var hide = 1
    var undefined = 1
    if (typeof item !== 'undefined') {
        if (typeof item.buy_price !== 'undefined')
            hide = 0
        console.log('defined')
        console.log(item.name)
    };

    const user=item.user
    // console.log(item.user.username)



    function docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    const [rangeval, setRangeval] = useState(null);



    var valPercent = 5;

    docReady(function () {
        if (hide === 1) {
            // document.getElementById("buyout").style.display = "";
            document.getElementById("buyout").style.display = "none";
        } else {
            // document.getElementById("buyout").style.display = "none";
            document.getElementById("buyout").display = "";
        }

        const mySlider = document.getElementById("myRange");
        const sliderValue = document.getElementById("slider-value");
        function slider() {
            valPercent = (mySlider.value / mySlider.max) * 100;
            // sliderValue.textContent = rangeval; //mySlider.value
            console.log(valPercent);
            setAmmount((parseInt(item.currently) + (rangeval * 0.01 * item.first_bid)).toFixed(2))
            console.log(ammount);
        }
        mySlider.oninput = slider();

    });





    return (

        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
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
                                            <strong>Started: {String(item.started).substring(0, 10)}</strong>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <strong>Ends: {String(item.ends).substring(0, 10)}</strong>
                                        </ListGroup.Item>

                                        {/* <ListGroup.Item>
                                            <strong>Seller: {item.user.id}</strong>
                                        </ListGroup.Item> */}

                                        {/* <ListGroup.Item>
                                    <ListGroup variant='horizontal'>
                                        <ListGroup.Item>
                                            <Row><strong>Started:</strong></Row>
                                            <Row><b>{String(item.started).substring(0,10)}</b></Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row><strong>Ends:</strong></Row>
                                            <Row><b>{String(item.ends).substring(0,10)}</b></Row>
                                        </ListGroup.Item>
                                    </ListGroup>
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
                                                        <strong>${item.currently}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        Active
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>



                                            {userInfo ? (

                                            
                                                <div>
                                                    <ListGroup.Item>
                                                        <h4>Bid ammount</h4>
                                                        <div class="slidecontainer">
                                                            <input type="range" min="5" max="100" defaultValue="1" step="1" class="slider" id="myRange"
                                                                onChange={(event) => setRangeval(event.target.value)} />
                                                            <div id="slider-value">{rangeval}%</div>
                                                            {/* <div>{(parseInt(item.currently)+(rangeval*0.01*item.first_bid)).toFixed(2)}$</div> */}
                                                            <div class="test">
                                                                <input type="text" class="input_text" disabled="true"
                                                                    value={(parseInt(item.currently) + (rangeval * 0.01 * item.first_bid)).toFixed(2)} size="6"></input>
                                                            </div>
                                                        </div>
                                                    </ListGroup.Item>
                                                    {loadingItemBid && <Loader />}
                                                    {successItemBid && <Message variant='success'>Bid Placed</Message>}
                                                    {errorItemBid && <Message variant='danger'>{errorItemBid}</Message>}
                                                    <ListGroup.Item>
                                                        <Button
                                                            className='btn-block'
                                                            type='submit'
                                                            disabled={loadingItemBid}
                                                            variant='primary'
                                                            onClick={submitHandler}
                                                        >Place Bid</Button>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item id="buyout">
                                                        <Button className='btn-block' type='button'>Buy Now for ${item.buy_price}</Button>
                                                    </ListGroup.Item>
                                                </div>
                                            ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to place a bid.</Message>
                                            )}


                                            {/* <ListGroup.Item>
                                      <div>
                                          <h1>Bids</h1>
                                          <Row>
                                              {item_bids.map(bid => (
                                                  <Col key={bid._id}>
                                                      <Bid bid={bid} />
                                                  </Col>
                                              ))}
                                          </Row>
                                      </div>
                                      </ListGroup.Item> */}
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row id='latest-bids'>
                                <Row id='latest-bids1'>
                                    <h4 id='latest-bids4'>Latest Bids</h4>
                                </Row>
                                <Row id='latest-bids2'>
                                    {item.bids.length === 0 && <Message variant='info'>No bids</Message>}

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
                        </div>

            }
        </div>
    );
}

export default ItemScreen