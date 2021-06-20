import { GET_CHAT_PAGE_SUCCESS, GET_CHAT_PAGE_ERROR, OPEN_UPDATE_CHAT, CLOSE_UPDATE_CHAT, FETCH_MORE_CHATS_SUCCESS, FETCH_MORE_CHATS_ERROR } from "./chatActionsTypes"
import axios from "axios";
import listServerErrors from "../../global/functions/listServerErrors";
import { getTokenFromLocalStorage } from '../../Auth/authService';
import { openNotification } from "../../Notification/notificationActions";

// Create chat Actions
// This function create a new chat and show a notification in case of success or error
export function createChat(chat) {
    
    return async (dispatch) => {
        
        // convert user input to json
        const chatJson = JSON.stringify(chat);

        try {
            // Get token from local storage
            const accessToken = getTokenFromLocalStorage("access_token");
            // Request API to create the new chat
            await axios.post(
                "/api/chats",
                chatJson,
                { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
            )
            // Show success notification
            dispatch(openNotification("Chat crée avec succès", "success"));
            // Reload chat list
            dispatch(getChatPage(0));
            return true
        } catch (error) {
            const statusCode = error.response.status
            const data = error.response.data
            // Extract errors messages from response        
            const errorMessages = listServerErrors(statusCode, data);
            // Show errors in notification
            dispatch(openNotification(errorMessages, "error"))
            return false
        }
    }
}

// Delete chat Action
export function deleteChat(chatId) {
    console.log(chatId);
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            await axios.delete(`/api/chats/${chatId}`, config);
            dispatch(openNotification("chat supprimé avec succès", "success"))
            dispatch(getChatPage(0))
            return true
        } catch (error) {
            dispatch(openNotification("La suppression du chat a échoué", "error"))
            return false           
        }
    }
}

// Get chat List Page Action
export function getChatPageSuccess(pageNumber, chatPage, totalPages) {
    return {
        type: GET_CHAT_PAGE_SUCCESS,
        chatPage: chatPage,
        pageNumber: pageNumber,
        totalPages: totalPages
    }
}

export function getChatPageError() {
    return {
        type: GET_CHAT_PAGE_ERROR,
        errorMsg: "Une erreur est survenue"
    }
}

export function getChatPage(pageNumber) {
    console.log("getChatPage called with page number : " + pageNumber);
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const pageSize = 5;
            const response = await axios.get(`/api/chats?page=${pageNumber}&size=${pageSize}`, config);
            const chatPage = response.data.content;
            const totalPages = response.data.totalPages;
            const last = response.data.last
            dispatch(getChatPageSuccess(pageNumber, chatPage, totalPages, last))
        } catch {           
            dispatch(getChatPageError());
        }
    }
}

// Actions for update chat
export function openUpdateChat(chat) {
    return {
        type: OPEN_UPDATE_CHAT,
        open: true,
        chat: chat
    }
}

export function closeUpdateChat() {
    return {
        type: CLOSE_UPDATE_CHAT,
        open: false,
        chat: null
    }
}

export function updateChat(chat) {
    return async (dispatch) => {

        const chatJson = JSON.stringify(chat);

        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            await axios.put(
                `/api/chats/${chat.id}`,
                chatJson,
                { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
            )

            dispatch(openNotification("chat modifié avec succès", "success"))
            dispatch(closeUpdateChat());
            dispatch(getChatPage(0));
            return true
        } catch (error) {
            const statusCode = error.response.status
            const data = error.response.data            
            const errorMessages = listServerErrors(statusCode, data);
            dispatch(openNotification(errorMessages, "error"))
            return false
        }
    }
}

// Fetch more chats action
export function fetchMoreChatsSuccess(pageNumber, chatPage, totalPages, last) {
    return {
        type: FETCH_MORE_CHATS_SUCCESS,
        chatPage: chatPage,
        pageNumber: pageNumber,
        totalPages: totalPages,
        last: last
    }
}

export function fetchMoreChatsError() {
    return {
        type: FETCH_MORE_CHATS_ERROR,
        errorMsg: "Une erreur est survenue"
    }
}

export function fetchMoreChats(pageNumber) {
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const pageSize = 5;
            const response = await axios.get(`/api/chats?page=${pageNumber}&size=${pageSize}`, config);
            const chatPage = response.data.content;
            const totalPages = response.data.totalPages;
            const last = response.data.last
            dispatch(fetchMoreChatsSuccess(pageNumber, chatPage, totalPages, last))
        } catch {           
            dispatch(fetchMoreChatsError());
        }
    }
}