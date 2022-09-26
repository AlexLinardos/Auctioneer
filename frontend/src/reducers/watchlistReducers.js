import { WATCHLIST_ADD_ITEM } from '../constants/watchlistConstants'



export const watchlistReducer = (state = { watchlistItems: [] }, action) => {
    switch(action.type) {
        case WATCHLIST_ADD_ITEM:
            return{
                ...state,
                watchlistItems:[...state.watchlistItems, item]
            }
        default:
            return state
    }
}