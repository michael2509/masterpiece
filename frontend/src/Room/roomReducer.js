import { GET_ROOM_LIST_PAGE_SUCCESS, GET_ROOM_LIST_PAGE_ERROR, OPEN_UPDATE_ROOM, CLOSE_UPDATE_ROOM } from "./roomActionsTypes";

const initialState = {
    pageNumber: 0,
    totalPages: 0,
    updateRoomState: {
        room: {
            id: null,
            name: ""
        },
        open: false
    }
}

export default function roomReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROOM_LIST_PAGE_SUCCESS:
            return Object.assign({}, state, {
                pageNumber: action.pageNumber,
                roomListPage: action.roomListPage,
                totalPages: action.totalPages
            })
        case GET_ROOM_LIST_PAGE_ERROR:
            return Object.assign({}, state, {
                errorMsg: action.errorMsg
            })
        case OPEN_UPDATE_ROOM:
            return {
                ...state,
                updateRoomState: { open: action.open, room: action.room }
            }
        case CLOSE_UPDATE_ROOM:
            return {
                ...state,
                updateRoomState: { ...state.updateRoomState, open: action.open }
            }
        default:
            return state;
    }
}