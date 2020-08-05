import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from "../Auth/SignUp/signUpActionTypes";
import { EVENT_CREATION_SUCCESS, EVENT_CREATION_ERROR } from "../Event/eventActionsTypes"

export function notificationReducer(state = {messages: []}, action) {
    
    switch (action.type) {
        case ACCOUNT_CREATION_SUCCESS:
        case EVENT_CREATION_SUCCESS:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            });
        case ACCOUNT_CREATION_ERROR:
        case EVENT_CREATION_ERROR:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            })
        default:
            return state;
    }
}