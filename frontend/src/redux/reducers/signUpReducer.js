import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from "../actions/actionTypes";

export function signUpReducer(state = {}, action) {
    
    switch (action.type) {
        case ACCOUNT_CREATION_SUCCESS:
            return Object.assign({}, state, {
                severity: action.severity,
                message: action.message,
                date: action.date
            })
        case ACCOUNT_CREATION_ERROR:
            return Object.assign({}, state, {
                severity: action.severity,
                message: action.message,
                date: action.date
            })
    
        default:
            return state;
    }
}