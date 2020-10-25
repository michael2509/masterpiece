import { SEND_MESSAGE_SUCCESS, ADD_MESSAGE } from "./messageActionsTypes"

export const sendMessageSuccess = () => ({
    type: SEND_MESSAGE_SUCCESS,
    severity: "success",
    messages: [`Message envoyé !`],
    date: Date.now()
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    author: message.author,
    message: message.message
})

export const sendMessage = (message, clientRef) => {
    return (dispatch) => {
        clientRef.sendMessage('/app/user-all', JSON.stringify({
            author: message.author,
            message: message.message
        }));
    }
}