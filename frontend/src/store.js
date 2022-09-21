import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const initialSate = {}

const middleware = [thunk]

const store = createStore(reducer, initialSate, composeWithDevTools(applyMiddleware(...middleware)))

export default store