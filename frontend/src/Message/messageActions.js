import { ADD_MESSAGE, GET_MESSAGE_LIST } from "./messageActionsTypes"
import axios from "axios";

// Add message action
export const addMessage = (senderName, text) => ({
    type: ADD_MESSAGE,
    senderName: senderName,
    text: text
})

// Fetch messages actions
export const fetchMessageList = (messageList) => ({
    type: GET_MESSAGE_LIST,
    messageList: messageList
})

// Format message list to keep only sender name and text
const formatMessages = (messageList) => {
    const formattedMessageList = [];

    for (const message of messageList) {
        const formattedMessage = { text: message.text, senderName: null }
        if (message.speaker != null) {
            formattedMessage.senderName = message.speaker.username
        }
        if (message.guest != null) {
            formattedMessage.senderName = message.guest.pseudo
        }
        formattedMessageList.push(formattedMessage)
    }

    return formattedMessageList;
}

// Get message list
export const getMessageList = (chatId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/messages/chat/${chatId}`);
            const messageList = response.data
            console.log(messageList);
            const formattedMsgList = formatMessages(messageList);
            console.log("get message list");
            console.log(formattedMsgList);
            dispatch(fetchMessageList(formattedMsgList));
        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}