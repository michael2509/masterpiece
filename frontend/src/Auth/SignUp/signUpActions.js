import { USER_CREATION_SUCCESS, USER_CREATION_ERROR } from './signUpActionTypes.js';
import axios from 'axios';
import listServerErrors from "../../global/functions/listServerErrors";

export function userCreationSuccess() {
    return {
        type: USER_CREATION_SUCCESS,
        severity: "success",
        messages: ["Compte crée avec succès"],
        date: Date.now()
    }
}

export function userCreationError(errorMessages) {
    return {
        type: USER_CREATION_ERROR,
        severity: "error",
        messages: errorMessages,
        date: Date.now()
    }
}

export function createUser(user) {
    
    return async (dispatch) => {
        
        const userJson = JSON.stringify(user);
        
        try {
            await axios.post('http://localhost:8081/api/users', userJson, { headers: { 'Content-Type': 'application/json' } })
            dispatch(userCreationSuccess())
            return true
        }
        catch (error) {
            const errorMessages = listServerErrors(error.response);
            dispatch(userCreationError(errorMessages))
            return false
        }
    }
}