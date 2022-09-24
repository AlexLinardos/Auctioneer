import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import bids from '../bids'
import Bid from '../components/Bid'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listItemDetails, placeItemBid } from '../actions/itemActions'

import { useParams } from 'react-router-dom';

function ItemScreen({}) {
    const [bid, setBid] = useState(0)

    const dispatch = useDispatch()

    const itemDetails = useSelector(state => state.itemDetails)
    const { loading, error, item } = itemDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // const itemBidPlace = useSelector(state => state.itemBidPlace)
    // const { 
    //     loading:loadingItemBid, 
    //     error:errorItemBid, 
    //     success:successItemBid, 
    // } = itemBidPlace

    const { id } = useParams();

    useEffect(() => {
        dispatch(listItemDetails(id))
        

    }, [dispatch])
    // const item = items.find((i) => i._id === id)

    var currently
    var item_bids
    if(typeof item !== 'undefined'){
        item_bids = bids.filter((b) => b.item_id === id)
        item_bids.reverse()
        currently = item.first_bid
        if (item_bids.length !== 0)
        {
            currently = item_bids[0].price
        }
    };
    

    return (
        
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
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
                            </ListGroup>
                        </Col>

                          <Col md={3}>
                              <Card>
                                  <ListGroup variant="flush">
                                      <ListGroup.Item>
                                          <Row>
                                              <Col>Currently:</Col>
                                              <Col>
                                                  <strong>${currently}</strong>
                                              </Col>
                                          </Row>
                                      </ListGroup.Item>
                                      <ListGroup.Item>
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
                                      </ListGroup.Item>
                                  </ListGroup>
                              </Card>
                          </Col> 
                    </Row>

                    <Row>
                        <Col md={6}>
                            <h4>Bids</h4>
                            {item.bids.length === 0 && <Message variant='info'>No bids</Message>}

                            <ListGroup>
                                {item.bids.map((bid) => (
                                    <ListGroup.Item key={bid.id}>
                                        <strong>{bid.user.username}</strong>
                                        Ammount: ${bid.ammount}
                                        <p>{bid.time.substring(0,10)}</p>
                                    </ListGroup.Item>
                                ))}


                            </ListGroup>
                        </Col>
                    </Row>
                </div>
                
            }
        </div>
    );
}

export default ItemScreen