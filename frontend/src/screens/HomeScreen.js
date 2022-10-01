import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import Item from '../components/Item'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listItems } from '../actions/itemActions'
import globalStatus from '../globalStatus'

function HomeScreen() {
  const navigate = useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const itemList = useSelector(state => state.itemList)
  const { error, loading, items, page, pages } = itemList

  let keyword = window.location.search;
  console.log(keyword);
  // let flag = 'Active'

  useEffect(() => {
    if (!userInfo && (globalStatus.guest === false)) {
      navigate('/welcome')
    }
    dispatch(listItems(keyword, 'flag=Active'))

  }, [dispatch, userInfo, navigate, keyword])

  return (
    <div>
      <h1>Latest Items</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>
          <Row>
            {items?.filter(item=> item.status === "Active").map(item => (
                <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                    <Item item={item} />
                </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
      }
    </div>
  )
}

export default HomeScreen

// function HomeScreen() {
//   const navigate = useNavigate()
//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin
//   const dispatch = useDispatch()
//   const itemList = useSelector(state => state.itemList)
//   const { error, loading, items } = itemList

//   let keyword = window.location.search;
//   console.log(keyword);

//   useEffect(() => {
//     if (!userInfo && (globalStatus.guest === false)) {
//       navigate('/welcome')
//     }
//     dispatch(listItems())

//   }, [dispatch, userInfo, navigate])

//   return (
//     <div>
//       <h1>Latest Items</h1>
//       {loading ? <Loader />
//         : error ? <Message variant='danger'>{error}</Message>
//           :
//           <Row>
//             {items.filter(item=> item.status === "Active").map(item => (
//                 <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
//                     <Item item={item} />
//                 </Col>
//             ))}
//           </Row>
//       }
//     </div>
//   )
// }

// export default HomeScreen


