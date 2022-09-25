import React from 'react'
import { Card } from 'react-bootstrap'
import {  Link  } from 'react-router-dom'
import Bid from '../components/Bid'

function Item({ item }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/items/${item._id}`}>
                <Card.Img src = {item.image} />
            </Link>

            <Card.Body>
                <Link to={`/items/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="div">
                        <strong>{item.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-2">
                        Currently:  ${item.currently}
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
