import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Item from '../components/Item'
 
import items from '../items'

function HomeScreen() {
  return (
    <div>
        <h1>Latest Items</h1>
        <Row>
            {items.map(item => (
                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <Item item={item} />
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen
