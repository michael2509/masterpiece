import { OPEN_NOTIFICATION, CLOSE_NOTIFICATION } from "./notificationActionsTypes";

// Initial state for notification reducer
const notificationInitialState = {
    open: false,
    message: null,
    severity: null
}

// Notification reducer
export default function notificationReducer(state = notificationInitialState, action) {
    
    switch (action.type) {
        case OPEN_NOTIFICATION:
        case CLOSE_NOTIFICATION:
            return {
                ...state,
                open: action.open,
                message: action.message,
                severity: action.severity
            };
        default:
            return state;
    }
}