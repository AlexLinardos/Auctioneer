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
    ITEM_CREATE_RESET,

    ITEM_UPDATE_REQUEST,
    ITEM_UPDATE_SUCCESS,
    ITEM_UPDATE_FAIL,
    ITEM_UPDATE_RESET,

    ITEM_PLACE_BID_REQUEST,
    ITEM_PLACE_BID_SUCCESS,
    ITEM_PLACE_BID_FAIL,
    ITEM_PLACE_BID_RESET,

    RECOMMENDS_REQUEST,
    RECOMMENDS_SUCCESS,
    RECOMMENDS_FAIL,

    ITEM_HOT_REQUEST,
    ITEM_HOT_SUCCESS,
    ITEM_HOT_FAIL,
} from '../constants/itemConstants'

export const itemListReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEM_LIST_REQUEST:
            return { loading: true, items: [] }

        case ITEM_LIST_SUCCESS:
            return {loading:false, 
                items: action.payload.items, 
                page: action.payload.page, 
                pages: action.payload.pages
            }

        case ITEM_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

// export const categoryListReducer = (state ={categories:[]}, action) =>{
//     switch(action.type){
//         case CATEGORY_LIST_REQUEST:
//             return {loading:true, categories: []}

//         case CATEGORY_LIST_SUCCESS:
//             return {loading:false, categories: action.payload}

//         case CATEGORY_LIST_FAIL:
//             return {loading:false, error: action.payload}
        
//         default:
//             return state
//     }
// }

export const itemDetailsReducer = (state ={item:{ user: {}, bids:[], categorys:[]}}, action) =>{
    switch(action.type){
        case ITEM_DETAILS_REQUEST:
            return { loading: true, ...state }

        case ITEM_DETAILS_SUCCESS:
            return { loading: false, item: action.payload }

        case ITEM_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const itemDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_DELETE_REQUEST:
            return { loading: true }

        case ITEM_DELETE_SUCCESS:
            return { loading: false, success: true }

        case ITEM_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const itemCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_CREATE_REQUEST:
            return { loading: true }

        case ITEM_CREATE_SUCCESS:
            return { loading: false, success: true, item: action.payload }

        case ITEM_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case ITEM_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const itemUpdateReducer = (state = { item: {} }, action) => {
    switch (action.type) {
        case ITEM_UPDATE_REQUEST:
            return { loading: true }

        case ITEM_UPDATE_SUCCESS:
            return { loading: false, success: true, item: action.payload }

        case ITEM_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case ITEM_UPDATE_RESET:
            return { item: {} }

        default:
            return state
    }
}

export const itemBidPlaceReducer = (state = {}, action) => {
    switch (action.type) {
        case ITEM_PLACE_BID_REQUEST:
            return { loading: true }

        case ITEM_PLACE_BID_SUCCESS:
            return { loading: false, success: true, }

        case ITEM_PLACE_BID_FAIL:
            return { loading: false, error: action.payload }

        case ITEM_PLACE_BID_RESET:
            return {}

        default:
            return state
    }
}

export const itemHotReducer = (state = {items:[]}, action) => {
    switch (action.type) {
        case ITEM_HOT_REQUEST:
            return { loading: true, items: [] }

        case ITEM_HOT_SUCCESS:
            return { loading: false, items: action.payload }

        case ITEM_HOT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const recommendationListReducer = (state = { recommends: [] }, action) => {
    switch (action.type) {
        case RECOMMENDS_REQUEST:
            return { loading_recs: true, recommends: [] }

        case RECOMMENDS_SUCCESS:
            return { loading_recs: false, recommends: action.payload }

        case RECOMMENDS_FAIL:
            return { loading_recs: false, error_recs: action.payload }

        default:
            return state
    }
}