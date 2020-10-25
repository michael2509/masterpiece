import { SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR, ADD_MESSAGE } from "./messageActionsTypes"

export const sendMessageSuccess = () => ({
    type: SEND_MESSAGE_SUCCESS,
    severity: "success",
    messages: [`Message envoyé !`],
    date: Date.now()
})

export const sendMessageError = (messages) => ({
    type: SEND_MESSAGE_ERROR,
    severity: "error",
    messages: messages,
    date: Date.now()
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    author: message.author,
    message: message.message
})

export const sendMessage = (message, clientRef) => {
    return () => {
        clientRef.sendMessage('/app/user-all', JSON.stringify({
            author: message.author,
            message: message.message
        }));
    }
}