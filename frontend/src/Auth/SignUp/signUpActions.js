import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from './signUpActionTypes.js';
import axios from 'axios';
import listServerErrors from "../../global/functions/listServerErrors";

export function accountCreationSuccess() {
    return {
        type: ACCOUNT_CREATION_SUCCESS,
        severity: "success",
        messages: ["Compte crée avec succès"],
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

export function createAccount(account) {
    
    return async (dispatch) => {
        
        const accountJson = JSON.stringify(account);
        
        try {
            await axios.post('http://localhost:8081/api/accounts', accountJson, { headers: { 'Content-Type': 'application/json' } })
            dispatch(accountCreationSuccess())
            return true
        }
        catch (error) {
            const errorMessages = listServerErrors(error.response);
            dispatch(accountCreationError(errorMessages))
            return false
        }
    }
}