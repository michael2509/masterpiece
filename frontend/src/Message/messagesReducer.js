import { ADD_MESSAGE, ADD_MESSAGE_LIST } from "./messageActionsTypes";

const initialState = []

export default function messagesReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_MESSAGE:
            return [
                { author: action.author, message: action.message },
                ...state
            ]
        case ADD_MESSAGE_LIST:
            return [...action.messageList, ...state]
        default:
            return state;
    }
}