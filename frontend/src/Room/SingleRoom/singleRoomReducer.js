import { CLOSE_CREATE_GUEST, OPEN_CREATE_GUEST, SET_CURRENT_USERNAME, SINGLE_ROOM_FOUND } from "./singleRoomActionsTypes";

const initialState = {
    id: null,
    name: null,
    code: null,
    speakerUsername: null,
    currentUsername: null,
    showCreateGuest: false
}

export default function singleRoomReducer(state = initialState, action) {
    switch(action.type) {
        case SINGLE_ROOM_FOUND:
            return {
                ...state,
                id: action.room.id,
                name: action.room.name,
                code: action.room.code,
                speakerUsername: action.room.speakerUserUsername
            }
        case SET_CURRENT_USERNAME:
            return {...state, currentUsername: action.currentUsername}
        case OPEN_CREATE_GUEST:
        case CLOSE_CREATE_GUEST:
            return {...state, showCreateGuest: action.showCreateGuest}
        default:
            return state;
    }
}