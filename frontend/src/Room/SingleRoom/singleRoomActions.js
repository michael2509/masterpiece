import { CLOSE_CREATE_GUEST, OPEN_CREATE_GUEST, SET_SENDER_NAME, SET_SENDER_TYPE, SINGLE_ROOM_FOUND } from "./singleRoomActionsTypes";
import axios from "axios";
import { openNotification } from "../../Notification/notificationActions";

export const singleRoomFound = (room) => ({
    type: SINGLE_ROOM_FOUND,
    room: room
})

export const getSingleRoom = (roomId) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/chats/${roomId}`);
            const room = response.data

            console.log(room);
            
            if (room) {
                dispatch(singleRoomFound(room));
                return true;
            } else {
                dispatch(openNotification(`Aucun salon trouvé avec l'id [${roomId}]`, "error"))
                return false;
            }

        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}

export const getSingleRoomByAccessCode = (roomCode) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/chats/getByAccessCode/${roomCode}`);
            const room = response.data

            console.log(room);
            
            if (room) {
                dispatch(singleRoomFound(room));
                return room;
            } else {
                dispatch(openNotification(`Aucun salon trouvé avec le code d'accès [${roomCode}]`, "error"))
                return false;
            }

        } catch(e) {           
            console.log(e);
            return false;
        }
    }
}

export const setSenderName = (senderName) => ({
    type: SET_SENDER_NAME,
    senderName: senderName
})

export const setSenderType = (senderType) => ({
    type: SET_SENDER_TYPE,
    senderType: senderType
})

export const openCreateGuest = () => ({
    type: OPEN_CREATE_GUEST,
    showCreateGuest: true
})

export const closeCreateGuest = () => ({
    type: CLOSE_CREATE_GUEST,
    showCreateGuest: false
})