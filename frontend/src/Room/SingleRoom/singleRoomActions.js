import { GET_SINGLE_ROOM_SUCCESS } from "./singleRoomActionsTypes";
import axios from "axios";

export const getRoomSuccess = (room) => ({
    type: GET_SINGLE_ROOM_SUCCESS,
    room: room
})

export const getRoom = (code) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/rooms/${code}`);
            const room = response.data
            dispatch(getRoomSuccess(room))
        } catch(e) {           
            console.log(e.response.data);
        }
    }
}