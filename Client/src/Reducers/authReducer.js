import * as cnsts from '../Actions/ConstantActionTypes';

const initialState ={
    userAuth:{
        logInClicked: false
    }
}


function logInButtonClicked(state){
    return Object.assign({}, state, {
        logInClicked: !state.logInClicked
    } )
}

function violationsReducer(state = initialState, action) {
    switch (action.type){
        case cnsts.logInButtonClicked:
            return logInButtonClicked(state)
        default:
            return state;
    }
}

export default violationsReducer;