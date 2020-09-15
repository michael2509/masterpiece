import { GET_ROOM_LIST_PAGE_SUCCESS, GET_ROOM_LIST_PAGE_ERROR } from "./roomActionsTypes";


export default function roomReducer(state = { pageNumber: 0, totalPages: 0 }, action) {
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
        default:
            return state;
    }
}