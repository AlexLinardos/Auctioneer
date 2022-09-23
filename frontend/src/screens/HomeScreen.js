import React, { useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Item from '../components/Item'
import axios, { Axios } from 'axios'

function HomeScreen() {
  const [items, setItems] = useState([])

  useEffect(() => {

    async function fetchItems(){

      const { data } = await axios.get('/api/items/')
      setItems(data)
    }

    fetchItems()

  }, [])

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
