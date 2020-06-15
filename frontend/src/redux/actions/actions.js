import { ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_ERROR } from './actionTypes.js';
import axios from 'axios';
import errorType from "../../error-type/errorType";

export function accountCreationSuccess() {
    return {
        type: ACCOUNT_CREATION_SUCCESS,
        status: "success",
        message: "Compte créer avec succès",
        date: Date.now()
    }
}

export function accountCreationError(errorMessage) {
    return {
        type: ACCOUNT_CREATION_ERROR,
        status: "error",
        message: errorMessage,
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
            const errorMessage = errorType(error.response)
            dispatch(accountCreationError(errorMessage))
            return "error"
        }
    }
}