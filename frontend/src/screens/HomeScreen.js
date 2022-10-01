import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import Item from '../components/Item'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listItems, recommendItems } from '../actions/itemActions'
import { getUserDetails } from '../actions/userActions';
import globalStatus from '../globalStatus'

function HomeScreen() {
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


  useEffect(() => {
    if (!userInfo && (globalStatus.guest === false)) {
      navigate('/welcome')
    }
    dispatch(listItems(keyword, 'flag=Active'))
    if (user?.userProfile?.id) {
      dispatch(recommendItems(user.userProfile.id))
    } else {
      dispatch(getUserDetails('profile'))
    }

  }, [dispatch, userInfo, navigate, user, keyword])

  // sort recommendations by MF score
  recommends.sort((a, b) => b.score - a.score)

  let recommend_list = []
  Object.keys(recommends).forEach(function (key) {
    recommend_list.push(recommends[key]?.itemObj)
  })

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
      <br></br>
      <h1>Recommended for you</h1>
      {loading_recs ? <Loader />
        : error_recs ? <Message variant='danger'>{error_recs}</Message>
          :
          <Row>
            {recommend_list.filter(item => item.status === "Active").map(item => (
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


