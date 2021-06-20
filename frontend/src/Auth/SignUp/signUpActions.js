import axios from 'axios';
import listServerErrors from "../../global/functions/listServerErrors";
import { openNotification } from "../../Notification/notificationActions";

// Action to create a new speaker
export function createSpeaker(speaker) {
    
    return async (dispatch) => {
        
        const speakerJson = JSON.stringify(speaker);
        
        try {
            await axios.post('/api/speakers', speakerJson, { headers: { 'Content-Type': 'application/json' } })
            dispatch(openNotification("Compte crée avec succès", "success"))
            return true
        }
        catch (error) {
            const statusCode = error.response.status
            const data = error.response.data
            const errorMessages = listServerErrors(statusCode, data);
            dispatch(openNotification(errorMessages, "error"))
            return false
        }
    }
}