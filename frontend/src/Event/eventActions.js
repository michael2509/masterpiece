import { EVENT_CREATION_SUCCESS, EVENT_CREATION_ERROR } from "./eventActionsTypes"
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

export function createEvent(event) {
    
    return async (dispatch) => {

        event.startDateTime = convertUTCDateToLocalDate(event.startDateTime);
        event.endDateTime = convertUTCDateToLocalDate(event.endDateTime);

        const eventJson = JSON.stringify(event);

        try {
            await axios.post(
                "http://localhost:8081/events",
                eventJson,
                { headers: { 'Content-Type': 'application/json' } }
            )

            dispatch(eventCreationSuccess());
            return "success"
        } catch (error) {
            let errorMessages;
            
            error.response ? errorMessages = listServerErrors(error.response) : errorMessages = ["Erreur de connexion au serveur"]
            
            dispatch(eventCreationError(errorMessages))
            return "error"
        }
    }
}