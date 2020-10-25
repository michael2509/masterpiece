import notificationReducer from "../Notification/notificationReducer";
import roomsReducer from "../Room/roomsReducer";
import messagesReducer from "../Room/SingleRoom/Message/messagesReducer";
import singleRoomReducer from "../Room/SingleRoom/singleRoomReducer";

export function rootReducer(state = {}, action) {
    return {
        navbar: { height: 64 },
        notification: notificationReducer(state.notification, action),
        rooms: roomsReducer(state.rooms, action),
        singleRoom: singleRoomReducer(state.singleRoom, action),
        messages: messagesReducer(state.messages, action)
    }
}