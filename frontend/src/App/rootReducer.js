import notificationReducer from "../Notification/notificationReducer";
import meetingReducer from "../Meeting/meetingReducer";

export function rootReducer(state = {}, action) {
    return {
        notification: notificationReducer(state.notification, action),
        meetings: meetingReducer(state.meetings, action)
    }
}