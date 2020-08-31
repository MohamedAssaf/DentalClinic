import authReducer from './authReducer';
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";

const initialState = {}

function rootReducer(state = initialState, action) {
    switch (action.type){
        default:
            return state;
    }
}

export default combineReducers({
    rootReducer,
    authReducer,
    firebase : firebaseReducer
  })
