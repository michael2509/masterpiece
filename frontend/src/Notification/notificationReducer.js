import { USER_CREATION_SUCCESS, USER_CREATION_ERROR } from "../Auth/SignUp/signUpActionTypes";
import { ROOM_CREATION_SUCCESS, ROOM_CREATION_ERROR, ROOM_DELETION_SUCCESS, ROOM_DELETION_ERROR, UPDATE_ROOM_SUCCESS, UPDATE_ROOM_ERROR } from "../Room/roomActionsTypes";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../Auth/Login/loginActionTypes";
import { LOGOUT_SUCCESS } from "../Auth/Logout/logoutActionTypes";
import { SINGLE_ROOM_NOT_FOUND } from "../Room/SingleRoom/singleRoomActionsTypes";
import { SEND_MESSAGE_SUCCESS } from "../Room/SingleRoom/Message/messageActionsTypes";

export default function notificationReducer(state = {messages: []}, action) {
    
    switch (action.type) {
        case USER_CREATION_SUCCESS:
        case USER_CREATION_ERROR:
        case LOGIN_SUCCESS:
        case LOGIN_ERROR:
        case LOGOUT_SUCCESS:
        case ROOM_CREATION_SUCCESS:
        case ROOM_CREATION_ERROR:
        case ROOM_DELETION_SUCCESS:
        case ROOM_DELETION_ERROR:
        case UPDATE_ROOM_SUCCESS:
        case UPDATE_ROOM_ERROR:
        case SINGLE_ROOM_NOT_FOUND:
        case SEND_MESSAGE_SUCCESS:
            return Object.assign({}, state, {
                severity: action.severity,
                messages: action.messages,
                date: action.date
            });
        default:
            return state;
    }
}