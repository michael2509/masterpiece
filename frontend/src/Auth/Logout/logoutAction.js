import { LOGOUT_SUCCESS } from "./logoutActionTypes";

export function showLogoutNotif() {
    return {
        type: LOGOUT_SUCCESS,
        severity: "info",
        messages: [`vous êtes déconnecté`],
        date: Date.now()
    }
}