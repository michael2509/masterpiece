import { CLOSE_CREATE_GUEST, OPEN_CREATE_GUEST, SET_SENDER_NAME, SINGLE_CHAT_FOUND, SET_SENDER_TYPE } from "./singleChatActionsTypes";

const initialState = {
    id: null,
    name: null,
    accessCode: null,
    speakerUsername: null,
    senderName: null,
    senderType: null,
    showCreateGuest: false
}

export default function singleChatReducer(state = initialState, action) {
    switch(action.type) {
        case SINGLE_CHAT_FOUND:
            return {
                ...state,
                id: action.chat.id,
                name: action.chat.name,
                accessCode: action.chat.accessCode,
                speakerUsername: action.chat.speaker.username
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