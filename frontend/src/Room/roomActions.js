import { ROOM_CREATION_SUCCESS, ROOM_CREATION_ERROR, GET_ROOM_LIST_PAGE_SUCCESS, GET_ROOM_LIST_PAGE_ERROR, ROOM_DELETION_SUCCESS, ROOM_DELETION_ERROR, OPEN_UPDATE_ROOM, CLOSE_UPDATE_ROOM, UPDATE_ROOM_SUCCESS, UPDATE_ROOM_ERROR, FETCH_MORE_ROOMS_SUCCESS, FETCH_MORE_ROOMS_ERROR } from "./roomActionsTypes"
import axios from "axios";
import listServerErrors from "../global/functions/listServerErrors";
import { getTokenFromLocalStorage } from '../Auth/authService';

// Create Room Actions
export function roomCreationSuccess() {
    return {
        type: ROOM_CREATION_SUCCESS,
        severity: "success",
        messages: ["Salon crée avec succès"],
        date: Date.now()
    }
}

export function roomCreationError(errorMessages) {
    return {
        type: ROOM_CREATION_ERROR,
        severity: "error",
        messages: errorMessages,
        date: Date.now()
    }
}

export function createRoom(room) {
    
    return async (dispatch) => {

        const roomJson = JSON.stringify(room);

        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            await axios.post(
                "http://localhost:8081/api/rooms",
                roomJson,
                { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
            )

            dispatch(roomCreationSuccess());
            dispatch(getRoomListPage(0));
            return true
        } catch (error) {            
            const errorMessages = listServerErrors(error.response);
            dispatch(roomCreationError(errorMessages))
            return false
        }
    }
}

// Delete Room Actions
export function roomDeletionSuccess() {
    return {
        type: ROOM_DELETION_SUCCESS,
        severity: "success",
        messages: ["Salon supprimé avec succès"],
        date: Date.now(),
    }
}

export function roomDeletionError() {
    return {
        type: ROOM_DELETION_ERROR,
        severity: "error",
        messages: ["La suppression du salon a échoué"],
        date: Date.now()
    }
}

export function deleteRoom(roomId) {
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            await axios.delete(`http://localhost:8081/api/rooms?roomId=${roomId}`, config);
            dispatch(roomDeletionSuccess())
            dispatch(getRoomListPage(0))
            return true
        } catch (error) {
            dispatch(roomDeletionError())
            return false           
        }
    }
}

// Get Room List Page Action
export function getRoomListPageSuccess(pageNumber, roomListPage, totalPages) {
    return {
        type: GET_ROOM_LIST_PAGE_SUCCESS,
        roomListPage: roomListPage,
        pageNumber: pageNumber,
        totalPages: totalPages
    }
}

export function getRoomListPageError() {
    return {
        type: GET_ROOM_LIST_PAGE_ERROR,
        errorMsg: "Une erreur est survenue"
    }
}

export function getRoomListPage(pageNumber) {
    console.log("getRoomListPage called with page number : " + pageNumber);
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const pageSize = 5;
            const response = await axios.get(`http://localhost:8081/api/rooms?page=${pageNumber}&size=${pageSize}`, config);
            const roomListPage = response.data.content;
            const totalPages = response.data.totalPages;
            const last = response.data.last
            dispatch(getRoomListPageSuccess(pageNumber, roomListPage, totalPages, last))
        } catch {           
            dispatch(getRoomListPageError());
        }
    }
}

// Actions for update room
export function openUpdateRoom(room) {
    return {
        type: OPEN_UPDATE_ROOM,
        open: true,
        room: room
    }
}

export function closeUpdateRoom() {
    return {
        type: CLOSE_UPDATE_ROOM,
        open: false,
        room: null
    }
}

export function updateRoomSuccess() {
    return {
        type: UPDATE_ROOM_SUCCESS,
        severity: "success",
        messages: ["Salon modifié avec succès"],
        date: Date.now()
    }
}

export function updateRoomError() {
    return {
        type: UPDATE_ROOM_ERROR,
        severity: "error",
        messages: ["La modification du salon a échoué"],
        date: Date.now()
    }
}

export function updateRoom(room) {
    return async (dispatch) => {

        const roomJson = JSON.stringify(room);

        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            await axios.put(
                "http://localhost:8081/api/rooms",
                roomJson,
                { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
            )

            dispatch(updateRoomSuccess());
            dispatch(closeUpdateRoom());
            dispatch(getRoomListPage(0));
            return true
        } catch (error) {            
            const errorMessages = listServerErrors(error.response);
            dispatch(updateRoomError(errorMessages))
            return false
        }
    }
}

// Fetch more rooms action
export function fetchMoreRoomsSuccess(pageNumber, roomListPage, totalPages, last) {
    return {
        type: FETCH_MORE_ROOMS_SUCCESS,
        roomListPage: roomListPage,
        pageNumber: pageNumber,
        totalPages: totalPages,
        last: last
    }
}

export function fetchMoreRoomsError() {
    return {
        type: FETCH_MORE_ROOMS_ERROR,
        errorMsg: "Une erreur est survenue"
    }
}

export function fetchMoreRooms(pageNumber) {
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const pageSize = 5;
            const response = await axios.get(`http://localhost:8081/api/rooms?page=${pageNumber}&size=${pageSize}`, config);
            const roomListPage = response.data.content;
            const totalPages = response.data.totalPages;
            const last = response.data.last
            dispatch(fetchMoreRoomsSuccess(pageNumber, roomListPage, totalPages, last))
        } catch {           
            dispatch(fetchMoreRoomsError());
        }
    }
}