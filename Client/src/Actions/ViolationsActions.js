import * as cnsts from './ConstantActionTypes';

export function loadMore ( data ) {

    return {
        type: cnsts.loadMoreViolations,
        payload: {
            violations: data.violations,
            type: data.type
        }
    }
}

export function realTimeViolations (data){
    return {
        type: cnsts.realtimeViolations,
        payload: {
            violation: data.violation,
            type: data.type
        }
    }
}

export function fetchViolations (data){
    console.log(data);
    return function (dispatch) {
        fetch(`${ipAddress}${violationTypeByCursor}/${data.type}/${data.cursor}`)
        .then(res => res.json())
        .then(json => {
            dispatch(loadMore({violations:json, type:data.type}))
        })
        .catch(
            err => console.log(err)
        )
    }
}
