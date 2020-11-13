import { ADD_MESSAGE, ADD_MESSAGE_LIST } from "./messageActionsTypes"
import axios from "axios";

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    author: message.author,
    message: message.message
})

export const sendMessage = (message, clientRef) => {
    return () => {
        clientRef.sendMessage('/app/user-all', JSON.stringify(message));
    }
}

export const addMessageList = (messageList) => ({
    type: ADD_MESSAGE_LIST,
    messageList: messageList
})

export const getMessageList = (roomCode) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/messages/room/${roomCode}`);
            const messageList = response.data
            console.log(messageList);
            dispatch(addMessageList(messageList));
        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}