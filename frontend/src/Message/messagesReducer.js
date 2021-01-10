import { ADD_MESSAGE, GET_MESSAGE_LIST } from "./messageActionsTypes";

const initialState = []

export default function messagesReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_MESSAGE:
            return [
                { username: action.username, message: action.message },
                ...state
            ]
        case GET_MESSAGE_LIST:
            return [...action.messageList]
        default:
            return state;
    }
}