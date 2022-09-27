import axios from 'axios'
import {  WATCHLIST_ADD_ITEM  } from '../constants/watchlistConstants';

export const addToWatchlist = (id) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/items/${id}`)

    dispatch({
        type: WATCHLIST_ADD_ITEM,
        payload: {
            item: data.id,
            name: data.name,
            image: data.image,
            price: data.currently,
        }
    })
    
}