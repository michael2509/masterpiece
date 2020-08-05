import axios from 'axios';

export function isLogged() {
    let logged = null
    const access_token = localStorage.getItem("access_token");

    if (access_token !== null) {
        logged = true;
    } else {
        logged = false
    }

    return logged;
}

export async function login(username, password) {
        const clientId = process.env.REACT_APP_CLIENT_ID
        const grantType = process.env.REACT_APP_GRANT_TYPE
      
        try {
            const response = await axios.post(`http://localhost:8081/oauth/token?grant_type=${grantType}&username=${username}&password=${password}&client_id=${clientId}`)
            const accessToken = response.data.access_token
            localStorage.setItem("access_token", accessToken)
            return true;
        } catch (error) {
            console.log(error.response);
            return false;
        }
}

export function logout() {
    localStorage.removeItem("access_token");
}