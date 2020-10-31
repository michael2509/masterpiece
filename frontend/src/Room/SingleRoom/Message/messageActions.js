import { ADD_MESSAGE } from "./messageActionsTypes"

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