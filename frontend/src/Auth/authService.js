import axios from 'axios';

// Check access token in local storage to verify if the user is logged
export function isLogged() {
    let logged = null;
    const access_token = getTokenFromLocalStorage("access_token");

    access_token ? logged = true : logged = false;

    return logged;
}

// Login function
export async function login(username, password) {
        const clientId = process.env.REACT_APP_CLIENT_ID
        const grantType = process.env.REACT_APP_GRANT_TYPE
      
        try {
            const response = await axios.post(`/oauth/token?grant_type=${grantType}&username=${username}&password=${password}&client_id=${clientId}`)
            const accessToken = response.data.access_token
            const expiresIn = response.data.expires_in
            setTokenInLocalStorage("access_token", accessToken, expiresIn)
            return true;
        } catch (error) {
            return false;
        }
}

// Logout function
export function logout() {
    localStorage.removeItem("access_token");
}

function setTokenInLocalStorage(tokenKey, tokenValue, expiresIn) {
    const now = new Date();
    const expiresInMls = expiresIn * 1000;

    const token = {
        value: tokenValue,
        expiry: now.getTime() + expiresInMls
    }

    localStorage.setItem(tokenKey, JSON.stringify(token))
}

// Retrieve token in local storage
export function getTokenFromLocalStorage(tokenKey) {
	const tokenStr = localStorage.getItem(tokenKey)
	// if the item doesn't exist, return null
	if (!tokenStr) {
		return null
	}
	const token = JSON.parse(tokenStr)
	const now = new Date()
	// compare the expiry time of the token with the current time
	if (now.getTime() > token.expiry) {
		// If the token is expired, delete the token from storage
		// and return null
		localStorage.removeItem(tokenKey)
		return null
    }

	return token.value
}

// Get speaker username
export async function getUsername() {        
    try {
        const accessToken = getTokenFromLocalStorage("access_token")
        const response = await axios.get(
            "/api/speakers/getusername",
            { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
        )
        const username = response.data;
        console.log(username);
        return username;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}