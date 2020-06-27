import { notificationReducer } from "../Notification/notificationReducer";

export function rootReducer(state = {}, action) {
    return {
        notification: notificationReducer(state.notification, action)
    }
}