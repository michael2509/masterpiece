import notificationReducer from "../Notification/notificationReducer";
import chatsReducer from "../Chat/redux/chatsReducer";
import messagesReducer from "../Message/messagesReducer";
import singleChatReducer from "../Chat/SingleChat/singleChatReducer";

// Root reducer
export function rootReducer(state = {}, action) {
    return {
        navbar: { height: 64 },
        notification: notificationReducer(state.notification, action),
        chats: chatsReducer(state.chats, action),
        SingleChat: singleChatReducer(state.SingleChat, action),
        messages: messagesReducer(state.messages, action)
    }
}