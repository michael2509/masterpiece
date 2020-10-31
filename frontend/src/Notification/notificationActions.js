import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from "./notificationActionsTypes";

export const openNotification = (message, severity = "default") => ({
    type: OPEN_NOTIFICATION,
    open: true,
    message: message,
    severity: severity
})

export const closeNotification = () => ({
    type: CLOSE_NOTIFICATION,
    open: false,
    message: null,
    severity: null
})