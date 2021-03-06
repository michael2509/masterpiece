import { ADD_MESSAGE, GET_MESSAGE_LIST } from "./messageActionsTypes";

const initialState = []

// Messages reducer
export default function messagesReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_MESSAGE:
            return [
                { senderName: action.senderName, text: action.text },
                ...state
            ]
        case GET_MESSAGE_LIST:
            return [...action.messageList]
        default:
            return state;
    }
}