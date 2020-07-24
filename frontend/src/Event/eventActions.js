import { EVENT_CREATION_SUCCESS, EVENT_CREATION_ERROR, GET_EVENT_LIST_PAGE_BY_ACCOUNT_SUCCESS, GET_EVENT_LIST_PAGE_BY_ACCOUNT_ERROR } from "./eventActionsTypes"
import axios from "axios";
import convertUTCDateToLocalDate from '../global/functions/convertUTCDateToLocalDate';
import listServerErrors from "../global/functions/listServerErrors";


export function eventCreationSuccess() {
    return {
        type: EVENT_CREATION_SUCCESS,
        severity: "success",
        messages: ["Événement crée avec succès"],
        date: Date.now()
    }
}

export function eventCreationError(errorMessages) {
    return {
        type: EVENT_CREATION_ERROR,
        severity: "error",
        messages: errorMessages,
        date: Date.now()
    }
}

export function getEventListPageByAccountSuccess(eventListPage) {
    return {
        type: GET_EVENT_LIST_PAGE_BY_ACCOUNT_SUCCESS,
        eventListPage: eventListPage
    }
}

export function getEventListPageByAccountError(errorMessages) {
    return {
        type: GET_EVENT_LIST_PAGE_BY_ACCOUNT_ERROR,
        severity: "error",
        messages: errorMessages,
        date: Date.now()
    }
}

export function createEvent(event) {
    
    return async (dispatch) => {

        event.startDateTime = convertUTCDateToLocalDate(event.startDateTime);
        event.endDateTime = convertUTCDateToLocalDate(event.endDateTime);

        const eventJson = JSON.stringify(event);

        console.log(eventJson);

        try {
            const accessToken = localStorage.getItem("accessToken");
            await axios.post(
                "http://localhost:8081/api/events/account/1",
                eventJson,
                { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
            )

            dispatch(eventCreationSuccess());
            return true
        } catch (error) {            
            const errorMessages = listServerErrors(error.response);
            dispatch(eventCreationError(errorMessages))
            return false
        }
    }
}

export function getEventListPageByAccount(accountId) {
    return async (dispatch) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const eventListPage = await axios.get(`http://localhost:8081/api/events/account/${accountId}?page=0&size=5`, config);
            console.log(eventListPage.data);
        } catch (error) {
            let errorMessages;
            
            error.response ? errorMessages = listServerErrors(error.response) : errorMessages = ["Erreur de connexion au serveur"];
            // dispatch(getEventListPageByAccountError(errorMessages));
            console.log(errorMessages);
        }
    }
}