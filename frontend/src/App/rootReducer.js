import { notificationReducer } from "../Notification/notificationReducer";
import eventReducer from "../Event/eventReducer";

export function rootReducer(state = {}, action) {
    return {
        notification: notificationReducer(state.notification, action),
        events: eventReducer(state.events, action)
    }
}