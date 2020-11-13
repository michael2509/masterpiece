import notificationReducer from "../Notification/notificationReducer";
import roomsReducer from "../Room/redux/roomsReducer";
import messagesReducer from "../Message/messagesReducer";
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