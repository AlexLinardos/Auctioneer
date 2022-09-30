import axios from 'axios'
import { 
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,

    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,

    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_DETAILS_FAIL,

    ITEM_DELETE_REQUEST,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAIL,

    ITEM_CREATE_REQUEST,
    ITEM_CREATE_SUCCESS,
    ITEM_CREATE_FAIL,

    ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,
    ITEM_UPDATE_FAIL,

    ITEM_PLACE_BID_REQUEST,
    ITEM_PLACE_BID_SUCCESS,
    ITEM_PLACE_BID_FAIL,
} from '../constants/itemConstants'

export const listItems = () => async (dispatch) => {
    try{    
        dispatch({ type: ITEM_LIST_REQUEST })

        const { data } = await axios.get('/api/items/')

        dispatch({ 
            type: ITEM_LIST_SUCCESS,
            payload: data
        })

    }catch (error) {
        dispatch({ 
            type: ITEM_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

// export const listCategories = () => async (dispatch) => {
//     try{    
//         dispatch({ type: CATEGORY_LIST_REQUEST })

//         const { data } = await axios.get('/api/items/')

//         dispatch({ 
//             type: CATEGORY_LIST_SUCCESS,
//             payload: data
//         })

//     }catch (error) {
//         dispatch({ 
//             type: CATEGORY_LIST_FAIL,
//             payload: error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//         })
//     }
// }

export const listItemDetails = (id) => async (dispatch) => {
    try{    
        dispatch({ type: ITEM_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/items/${id}`)

        dispatch({ 
            type: ITEM_DETAILS_SUCCESS,
            payload: data
        })

    }catch (error) {
        dispatch({ 
            type: ITEM_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const placeItemBid = (itemId, bid) => async (dispatch, getState) => {
    try{    
        dispatch({ type: ITEM_PLACE_BID_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization:  `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/items/${itemId}/bids/`,
            bid,
            config
        )

        dispatch({ 
            type: ITEM_PLACE_BID_SUCCESS,
            payload: data
        })

    }catch (error) {
        dispatch({ 
            type: ITEM_PLACE_BID_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

export const deleteItem = (id) => async (dispatch, getState) => {
    console.log('delete_action')
    try {
        dispatch({
            type: ITEM_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        console.log(id)
        const { data } = await axios.delete(
            `/api/items/delete/${id}/`,
            config
        )
        console.log('here')

        dispatch({
            type: ITEM_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: ITEM_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createItem = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ITEM_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/items/create/`,
            {},
            config
        )
        dispatch({
            type: ITEM_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ITEM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateItem = (item) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ITEM_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/items/update/${item._id}/`,
            item,
            config
        )
        dispatch({
            type: ITEM_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: ITEM_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ITEM_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}