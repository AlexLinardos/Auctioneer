import React from 'react'
import { Card } from 'react-bootstrap'
import {  Link  } from 'react-router-dom'
import Bid from '../components/Bid'

function Item({ item }) {
    return (
        <Card className="my-3 rounded" id="myCard">
            <Link to={`/items/${item._id}`}>
                <Card.Img className="card-img" src = {item.image} />
            </Link>

            <Card.Body>
                <Link to={`/items/${item._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title as="div">
                        <strong>{item.name}</strong>
                    </Card.Title>
                </Link>

                
                <Card.Text as="div">
                {item.currently !== '0.00' && item.currently !==null ?
                    (<div className="my-2">
                        Current Bid:  ${item.currently} 
                    </div>)
                :
                    (<div className="my-2">
                        Starting Bid: ${item.first_bid}
                    </div>)
                }
                </Card.Text>
                
                {/* <Card.Text as="h4">
                    Currently: ${currently}
                </Card.Text> */}
            </Card.Body>
        </Card>
    )
}

export default Item
