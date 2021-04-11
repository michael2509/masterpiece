import { CLOSE_CREATE_GUEST, OPEN_CREATE_GUEST, SET_SENDER_NAME, SET_SENDER_TYPE, SINGLE_CHAT_FOUND } from "./singleChatActionsTypes";
import axios from "axios";
import { openNotification } from "../../Notification/notificationActions";

export const SingleChatFound = (chat) => ({
    type: SINGLE_CHAT_FOUND,
    chat: chat
})

export const getSingleChat = (chatId) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/chats/${chatId}`);
            const chat = response.data

            console.log(chat);
            
            if (chat) {
                dispatch(SingleChatFound(chat));
                return true;
            } else {
                dispatch(openNotification(`Aucun chat trouvé avec l'id [${chatId}]`, "error"))
                return false;
            }

        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}

export const getSingleChatByAccessCode = (chatCode) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/chats/getByAccessCode/${chatCode}`);
            const chat = response.data

            console.log(chat);
            
            if (chat) {
                dispatch(SingleChatFound(chat));
                return chat;
            } else {
                dispatch(openNotification(`Aucun chat trouvé avec le code d'accès [${chatCode}]`, "error"))
                return false;
            }

        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}

export const setSenderName = (senderName) => ({
    type: SET_SENDER_NAME,
    senderName: senderName
})

export const setSenderType = (senderType) => ({
    type: SET_SENDER_TYPE,
    senderType: senderType
})

export const openCreateGuest = () => ({
    type: OPEN_CREATE_GUEST,
    showCreateGuest: true
})

export const closeCreateGuest = () => ({
    type: CLOSE_CREATE_GUEST,
    showCreateGuest: false
})