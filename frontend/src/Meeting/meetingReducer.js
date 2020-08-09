import { GET_MEETING_LIST_PAGE_SUCCESS, GET_MEETING_LIST_PAGE_ERROR } from "./meetingActionsTypes";


export default function meetingReducer(state = { pageNumber: 0 }, action) {
    switch (action.type) {
        case GET_MEETING_LIST_PAGE_SUCCESS:
            return Object.assign({}, state, {
                pageNumber: action.pageNumber,
                meetingListPage: action.meetingListPage
            })
        case GET_MEETING_LIST_PAGE_ERROR:
            return Object.assign({}, state, {
                errorMsg: action.errorMsg
            })            
        default:
            return state;
    }
}