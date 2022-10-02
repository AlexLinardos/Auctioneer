import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Item from '../components/Item'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listItems, recommendItems } from '../actions/itemActions'
import { getUserDetails } from '../actions/userActions';
import globalStatus from '../globalStatus'

import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

function SoldScreen() {
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const itemList = useSelector(state => state.itemList)
  const userDetails = useSelector(state => state.userDetails)
  const { error2, loading2, user } = userDetails
  const recommendationList = useSelector(state => state.recommendationList)
  const { error_recs, loading_recs, recommends } = recommendationList
  const { error, loading, items, page, pages } = itemList
  let keyword = window.location.search;
  console.log(keyword);
  console.log(keyword.startsWith('?keyword=&'))


  useEffect(() => {
    if (!userInfo && (globalStatus.guest === false)) {
      navigate('/welcome')
    }
    dispatch(listItems(keyword, 'flag=Won'))
    if (user?.userProfile?.id) {
      dispatch(recommendItems(user.userProfile.id))
    } else {
      dispatch(getUserDetails('profile'))
    }
    console.log(keyword);

  }, [dispatch, userInfo, navigate, user, keyword])

  return (
    <Row>
        {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
        <Col >
            <h1>Sold Items</h1>
            {items.length === 0 ? (
                <Message variant='info'>
                    No Auctions Won 
                    {/* <Link to='/'>Go Back</Link> */}
                </Message>
            ) : (
                    <ListGroup variant='flush'>
                        {items.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link 
                                        to={`/chat/${item.id}`} 
                                        style={{ textDecoration: 'none' }}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.currently}
                                    </Col>

                                    {/* {item.number_of_bids == 0 ? '' :
                                    <Col md={2}>
                                        Sold to: {item.bids.at(-1).name}
                                    </Col>
                                    } */}

                                    {/* <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            // onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col> */}
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
        </Col>
        }
    </Row>
  )
}

export default SoldScreen


