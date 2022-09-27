import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import Item from '../components/Item'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listItems } from '../actions/itemActions'

function HomeScreen() {
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const itemList = useSelector(state => state.itemList)
  const { error, loading, items } = itemList

  useEffect(() => {
    if (!userInfo) {
      navigate('/welcome')
    }
    dispatch(listItems())

  }, [dispatch,userInfo, navigate])

  return (
    <div>
        <h1>Latest Items</h1>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {items.filter(item=> item.status === "Active").map(item => (
                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <Item item={item} />
                </Col>
            ))}
          </Row>
      }
    </div>
  )
}

export default HomeScreen
