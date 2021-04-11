import { GET_CHAT_PAGE_SUCCESS, GET_CHAT_PAGE_ERROR, OPEN_UPDATE_CHAT, CLOSE_UPDATE_CHAT, FETCH_MORE_CHATS_SUCCESS, FETCH_MORE_CHATS_ERROR } from "./chatActionsTypes";

const initialState = {
    pageNumber: 0,
    totalPages: 0,
    last: null,
    updateChatState: {
        chat: {
            id: null,
            name: ""
        },
        open: false
    }
}

export default function chatsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHAT_PAGE_SUCCESS:
            return {
                ...state,
                pageNumber: action.pageNumber,
                chatPage: action.chatPage,
                totalPages: action.totalPages,
                last: action.last
            }
        case GET_CHAT_PAGE_ERROR:
            return {
                ...state,
                errorMsg: action.errorMsg
            }
        case OPEN_UPDATE_CHAT:
            return {
                ...state,
                updateChatState: { open: action.open, chat: action.chat }
            }
        case CLOSE_UPDATE_CHAT:
            return {
                ...state,
                updateChatState: { ...state.updateChatState, open: action.open }
            }
        case FETCH_MORE_CHATS_SUCCESS:
            return {
                ...state,
                pageNumber: action.pageNumber,
                chatPage: [...state.chatPage, ...action.chatPage],
                totalPages: action.totalPages,
                last: action.last
            }
        case FETCH_MORE_CHATS_ERROR:
            return {
                ...state,
                errorMsg: action.errorMsg
            }
        default:
            return state;
    }
}