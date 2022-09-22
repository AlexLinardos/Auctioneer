import React from 'react'
import { Card } from 'react-bootstrap'
import {  Link  } from 'react-router-dom'

import bids from '../bids'

function Item({ item }) {
    let item_bids = bids.filter((b) => b.item_id == item._id)
    item_bids.reverse()
    let currently = item.first_bid
    if (item_bids.length !== 0)
    {
        currently = item_bids[0].price
    }
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/item/${item._id}`}>
                <Card.Img src = {item.image} />
            </Link>

            <Card.Body>
                <Link to={`/item/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="div">
                        <strong>{item.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-2">
                        Currently:  ${currently}
                    </div>
                </Card.Text>
                
                {/* <Card.Text as="h4">
                    Currently: ${currently}
                </Card.Text> */}
            </Card.Body>
        </Card>
    )
}

export default Item
