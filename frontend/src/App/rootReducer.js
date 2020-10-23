import notificationReducer from "../Notification/notificationReducer";
import roomsReducer from "../Room/roomsReducer";
import singleRoomReducer from "../Room/SingleRoom/singleRoomReducer";

export function rootReducer(state = {}, action) {
    return {
        navbar: { height: 64 },
        notification: notificationReducer(state.notification, action),
        rooms: roomsReducer(state.rooms, action),
        singleRoom: singleRoomReducer(state.room, action)
    }
}