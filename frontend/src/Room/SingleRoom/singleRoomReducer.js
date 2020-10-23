import { GET_SINGLE_ROOM_SUCCESS } from "./singleRoomActionsTypes";

const initialState = {
    id: null,
    name: null,
    code: null,
    userUsername: null
}

export default function singleRoomReducer(state = initialState, action) {
    switch(action.type) {
        case GET_SINGLE_ROOM_SUCCESS:
            return {
                ...state,
                id: action.room.id,
                name: action.room.name,
                code: action.room.code,
                userUsername: action.room.userUsername
            }
        default:
            return state;
    }
}