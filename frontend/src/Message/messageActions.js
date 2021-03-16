import { ADD_MESSAGE, GET_MESSAGE_LIST } from "./messageActionsTypes"
import axios from "axios";

export const addMessage = (username, message) => ({
    type: ADD_MESSAGE,
    username: username,
    message: message
})

export const sendMessage = (message, sockJsClient) => {
    return () => {
        sockJsClient.sendMessage('/app/user-all', JSON.stringify(message));
    }
}

export const fetchMessageList = (messageList) => ({
    type: GET_MESSAGE_LIST,
    messageList: messageList
})

const formatMessages = (messageList) => {
    const formattedMessageList = [];

    for (const message of messageList) {
        formattedMessageList.push({ username: message.user.username, message: message.message})
    }

    return formattedMessageList;
}

export const getMessageList = (roomCode) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/messages/room/${roomCode}`);
            const messageList = response.data
            const formattedMsgList = formatMessages(messageList);
            console.log(formattedMsgList);
            dispatch(fetchMessageList(formattedMsgList));
        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}