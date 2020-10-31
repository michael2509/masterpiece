import axios from 'axios';
import listServerErrors from "../../global/functions/listServerErrors";
import { openNotification } from "../../Notification/notificationActions";

export function createUser(user) {
    
    return async (dispatch) => {
        
        const userJson = JSON.stringify(user);
        
        try {
            await axios.post('http://localhost:8081/api/users', userJson, { headers: { 'Content-Type': 'application/json' } })
            dispatch(openNotification("Compte crée avec succès", "success"))
            return true
        }
        catch (error) {
            const errorMessages = listServerErrors(error.response);
            dispatch(openNotification(errorMessages, "error"))
            return false
        }
    }
}