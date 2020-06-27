import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from './signUpActionTypes.js';
import axios from 'axios';
import listServerErrors from "../global/functions/list-server-errors/listServerErrors";

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

export function createAccount(account) {
    
    return async (dispatch) => {
        
        const accountJson = JSON.stringify(account);
        
        try {
            await axios.post('http://localhost:8081/accounts', accountJson, { headers: { 'Content-Type': 'application/json' } })
            dispatch(accountCreationSuccess())
            return "success"
        }
        catch (error) {
            let errorMessages;

            error.response ? errorMessages = listServerErrors(error.response) : errorMessages = ["Erreur de connexion au serveur"]
            
            dispatch(accountCreationError(errorMessages))
            return "error"
        }
    }
}