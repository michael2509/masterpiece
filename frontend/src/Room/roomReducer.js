import { GET_ROOM_LIST_PAGE_SUCCESS, GET_ROOM_LIST_PAGE_ERROR, OPEN_UPDATE_ROOM, CLOSE_UPDATE_ROOM, FETCH_MORE_ROOMS_SUCCESS, FETCH_MORE_ROOMS_ERROR, ROOM_DELETION_SUCCESS } from "./roomActionsTypes";

const initialState = {
    pageNumber: 0,
    totalPages: 0,
    last: null,
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
            return {
                ...state,
                pageNumber: action.pageNumber,
                roomListPage: action.roomListPage,
                totalPages: action.totalPages,
                last: action.last
            }
        case GET_ROOM_LIST_PAGE_ERROR:
            return {
                ...state,
                errorMsg: action.errorMsg
            }
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
        case FETCH_MORE_ROOMS_SUCCESS:
            return {
                ...state,
                pageNumber: action.pageNumber,
                roomListPage: [...state.roomListPage, ...action.roomListPage],
                totalPages: action.totalPages,
                last: action.last
            }
        case FETCH_MORE_ROOMS_ERROR:
            return {
                ...state,
                errorMsg: action.errorMsg
            }
        default:
            return state;
    }
}