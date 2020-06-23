import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from "./signUpActionTypes";

export function signUpReducer(state = {messages: []}, action) {
    
    switch (action.type) {
        case ACCOUNT_CREATION_SUCCESS:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            })
        case ACCOUNT_CREATION_ERROR:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            })
    
        default:
            return state;
    }
}