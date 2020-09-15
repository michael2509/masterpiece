import { LOGIN_SUCCESS, LOGIN_ERROR } from "./loginActionTypes"

export function loginSuccess(username) {
    return {
        type: LOGIN_SUCCESS,
        severity: "success",
        messages: [`Bienvenue ${username}, vous êtes connecté`],
        date: Date.now()
    }
}

export function loginError() {
    return {
        type: LOGIN_ERROR,
        severity: "error",
        messages: ["Informations de connexion invalides"],
        date: Date.now()
    }
}