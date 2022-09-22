import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import items from '../items'
import bids from '../bids'
import Bid from '../components/Bid'

import { useParams } from 'react-router-dom';

function ItemScreen({ match }) {
    const { id } = useParams();
    const item = items.find((i) => i._id === id)
    let item_bids = bids.filter((b) => b.item_id === id)
    item_bids.reverse()
    let currently = item.first_bid
    if (item_bids.length !== 0)
    {
        currently = item_bids[0].price
    }
    return (
        
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
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
        </div>
    )
}

export default ItemScreen