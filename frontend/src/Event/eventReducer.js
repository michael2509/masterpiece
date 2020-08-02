import { GET_EVENT_LIST_PAGE_SUCCESS, GET_EVENT_LIST_PAGE_ERROR } from "./eventActionsTypes";


export default function eventReducer(state = {}, action) {
    switch (action.type) {
        case GET_EVENT_LIST_PAGE_SUCCESS:
            return Object.assign({}, state, {
                eventListPage: action.eventListPage
            })
        case GET_EVENT_LIST_PAGE_ERROR:
            return Object.assign({}, state, {
                errorMsg: action.errorMsg
            })            
        default:
            return state;
    }
}