import * as cnsts from '../Actions/ConstantActionTypes';

const initialState ={
    logInClicked: false,
    loggedIn:false

}


function logInButtonClicked(state){
    return Object.assign({}, state, {
        logInClicked: !state.logInClicked
    } )
}

function authSuccessful(state) {
    return Object.assign({}, state, {
        loggedIn : true
    } )
}

function violationsReducer(state = initialState, action) {
    switch (action.type){
        case cnsts.logInButtonClicked:
            return logInButtonClicked(state);
        case cnsts.AUTH_SUCCESS:
            return authSuccessful(state);
        default:
            return state;
    }
}

export default violationsReducer;