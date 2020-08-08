import { USER_CREATION_SUCCESS, USER_CREATION_ERROR } from "../Auth/SignUp/signUpActionTypes";
import { MEETING_CREATION_SUCCESS, MEETING_CREATION_ERROR } from "../Meeting/meetingActionsTypes"

export default function notificationReducer(state = {messages: []}, action) {
    
    switch (action.type) {
        case USER_CREATION_SUCCESS:
        case MEETING_CREATION_SUCCESS:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            });
        case USER_CREATION_ERROR:
        case MEETING_CREATION_ERROR:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            })
        default:
            return state;
    }
}