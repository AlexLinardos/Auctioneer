import React from 'react'
import { Card } from 'react-bootstrap'
import {  Link  } from 'react-router-dom'

function Bid({ bid }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Body>
                <Card.Title as="div">
                    <strong>{bid.bidder}</strong>
                </Card.Title>

                <Card.Text as="h4">
                    Ammount: ${bid.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Bid