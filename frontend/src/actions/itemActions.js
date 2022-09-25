import axios from 'axios'
import { 
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,

    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_DETAILS_FAIL,

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