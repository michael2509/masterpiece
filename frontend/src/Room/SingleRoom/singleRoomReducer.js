import { SINGLE_ROOM_FOUND } from "./singleRoomActionsTypes";

const initialState = {
    id: null,
    name: null,
    code: null,
    speakerUsername: null
}

export default function singleRoomReducer(state = initialState, action) {
    switch(action.type) {
        case SINGLE_ROOM_FOUND:
            return {
                ...state,
                id: action.room.id,
                name: action.room.name,
                code: action.room.code,
                speakerUsername: action.room.speakerUsername
            }
        default:
            return state;
    }
}