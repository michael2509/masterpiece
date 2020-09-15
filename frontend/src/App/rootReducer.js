import notificationReducer from "../Notification/notificationReducer";
import roomReducer from "../Room/roomReducer";

export function rootReducer(state = {}, action) {
    return {
        notification: notificationReducer(state.notification, action),
        rooms: roomReducer(state.rooms, action)
    }
}