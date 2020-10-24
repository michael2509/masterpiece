import { SINGLE_ROOM_FOUND, SINGLE_ROOM_NOT_FOUND } from "./singleRoomActionsTypes";
import axios from "axios";

export const singleRoomFound = (room) => ({
    type: SINGLE_ROOM_FOUND,
    room: room
})

export const singleRoomNotFound = (code) => ({
    type: SINGLE_ROOM_NOT_FOUND,
    severity: "error",
    messages: [`Aucun salon trouvé avec le code [${code}]`],
    date: Date.now()
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
                dispatch(singleRoomNotFound(code))
                return false;
            }

        } catch(e) {           
            console.log(e.response.data);
            return false;
        }
    }
}