import { CLOSE_CREATE_GUEST, OPEN_CREATE_GUEST, SET_SENDER_NAME, SINGLE_ROOM_FOUND, SET_SENDER_TYPE } from "./singleRoomActionsTypes";

const initialState = {
    id: null,
    name: null,
    accessCode: null,
    speakerUsername: null,
    senderName: null,
    senderType: null,
    showCreateGuest: false
}

export default function singleRoomReducer(state = initialState, action) {
    switch(action.type) {
        case SINGLE_ROOM_FOUND:
            return {
                ...state,
                id: action.room.id,
                name: action.room.name,
                accessCode: action.room.accessCode,
                speakerUsername: action.room.speaker.username
            }
        case SET_SENDER_NAME:
            return {...state, senderName: action.senderName}
        case SET_SENDER_TYPE:
            return {...state, senderType: action.senderType}
        case OPEN_CREATE_GUEST:
        case CLOSE_CREATE_GUEST:
            return {...state, showCreateGuest: action.showCreateGuest}
        default:
            return state;
    }
}