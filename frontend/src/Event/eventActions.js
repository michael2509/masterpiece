import { EVENT_CREATION_SUCCESS, EVENT_CREATION_ERROR, GET_EVENT_LIST_PAGE_SUCCESS, GET_EVENT_LIST_PAGE_ERROR } from "./eventActionsTypes"
import axios from "axios";
import convertUTCDateToLocalDate from '../global/functions/convertUTCDateToLocalDate';
import listServerErrors from "../global/functions/listServerErrors";
import { roundToNearestMinutes } from "date-fns";


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

export function getEventListPageSuccess(eventListPage) {
    return {
        type: GET_EVENT_LIST_PAGE_SUCCESS,
        eventListPage: eventListPage
    }
}

export function getEventListPageError() {
    return {
        type: GET_EVENT_LIST_PAGE_ERROR,
        errorMsg: "Une erreur est survenue"
    }
}

export function createEvent(event) {
    
    return async (dispatch) => {

        event.startDateTime = roundToNearestMinutes(event.startDateTime)
        event.endDateTime = roundToNearestMinutes(event.endDateTime)
        event.startDateTime = convertUTCDateToLocalDate(event.startDateTime);
        event.endDateTime = convertUTCDateToLocalDate(event.endDateTime);

        const eventJson = JSON.stringify(event);

        console.log(eventJson);

        try {
            const accessToken = localStorage.getItem("access_token");
            await axios.post(
                "http://localhost:8081/api/events",
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

export function getEventListPage(currentPage) {
    return async (dispatch) => {
        try {
            const accessToken = localStorage.getItem("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const pageSize = 4;
            const response = await axios.get(`http://localhost:8081/api/events?page=${currentPage}&size=${pageSize}`, config);
            const eventListPage = response.data;
            console.log(eventListPage);
            dispatch(getEventListPageSuccess(eventListPage))
        } catch {           
            dispatch(getEventListPageError());
        }
    }
}