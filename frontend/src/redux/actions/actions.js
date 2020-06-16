import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from './actionTypes.js';
import axios from 'axios';
import errorType from "../../error-type/errorType";

export function accountCreationSuccess() {
    return {
        type: ACCOUNT_CREATION_SUCCESS,
        severity: "success",
        messages: ["Compte créé avec succès"],
        date: Date.now()
    }
}

export function accountCreationError(errorMessages) {
    return {
        type: ACCOUNT_CREATION_ERROR,
        severity: "error",
        messages: errorMessages,
        date: Date.now()
    }
}

export function createAccount(user) {
    
    return async (dispatch) => {
        
        const userJson = JSON.stringify(user);
        
        try {
            await axios.post('http://localhost:8081/users', userJson, { headers: { 'Content-Type': 'application/json' } })
            dispatch(accountCreationSuccess())
            return "success"
        }
        catch (error) {
            const errorMessages = errorType(error.response)
            dispatch(accountCreationError(errorMessages))
            return "error"
        }
    }
}