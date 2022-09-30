import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers';

import {
    itemListReducer,
    categoryListReducer,
    itemDetailsReducer,
    itemBidPlaceReducer,
    itemDeleteReducer,
    itemCreateReducer,
    itemUpdateReducer,
    recommendationListReducer,
} from './reducers/itemReducers';

import {
    watchlistReducer
} from './reducers/watchlistReducers';

import { visitReducer } from './reducers/otherReducers';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    itemList: itemListReducer,
    categoryList: categoryListReducer,
    itemDetails: itemDetailsReducer,
    itemBidPlace: itemBidPlaceReducer,
    // watchlist: watchlistReducer,
    itemDelete: itemDeleteReducer,
    itemCreate: itemCreateReducer,
    itemUpdate: itemUpdateReducer,
    recommendationList: recommendationListReducer,
    itemVisit: visitReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialSate = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialSate, composeWithDevTools(applyMiddleware(...middleware)))

export default store