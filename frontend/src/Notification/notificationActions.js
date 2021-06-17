import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from "./notificationActionsTypes";

// Open notification action
export const openNotification = (message, severity = "default") => ({
    type: OPEN_NOTIFICATION,
    open: true,
    message: message,
    severity: severity
})

// Close notification action
export const closeNotification = () => ({
    type: CLOSE_NOTIFICATION,
    open: false,
    message: null,
    severity: null
})