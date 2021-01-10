import { CLOSE_CREATE_GUEST, OPEN_CREATE_GUEST, SET_CURRENT_USERNAME, SINGLE_ROOM_FOUND } from "./singleRoomActionsTypes";
import axios from "axios";
import { openNotification } from "../../Notification/notificationActions";

export const singleRoomFound = (room) => ({
    type: SINGLE_ROOM_FOUND,
    room: room
})

export const getSingleRoom = (code) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/rooms/${code}`);
            const room = response.data
            
            if (room) {
                dispatch(singleRoomFound(room));
                return true;
            } else {
                dispatch(openNotification(`Aucun salon trouvé avec le code [${code}]`, "error"))
                return false;
            }

        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}

export const setcurrentUsername = (currentUsername) => ({
    type: SET_CURRENT_USERNAME,
    currentUsername: currentUsername
})

export const openCreateGuest = () => ({
    type: OPEN_CREATE_GUEST,
    showCreateGuest: true
})

export const closeCreateGuest = () => ({
    type: CLOSE_CREATE_GUEST,
    showCreateGuest: false
})