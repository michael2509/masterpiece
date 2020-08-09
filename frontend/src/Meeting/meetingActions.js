import { MEETING_CREATION_SUCCESS, MEETING_CREATION_ERROR, GET_MEETING_LIST_PAGE_SUCCESS, GET_MEETING_LIST_PAGE_ERROR } from "./meetingActionsTypes"
import axios from "axios";
import convertUTCDateToLocalDate from '../global/functions/convertUTCDateToLocalDate';
import listServerErrors from "../global/functions/listServerErrors";
import { roundToNearestMinutes } from "date-fns";
import { getTokenFromLocalStorage } from '../Auth/authService';



export function meetingCreationSuccess() {
    return {
        type: MEETING_CREATION_SUCCESS,
        severity: "success",
        messages: ["Meeting crée avec succès"],
        date: Date.now()
    }
}

export function meetingCreationError(errorMessages) {
    return {
        type: MEETING_CREATION_ERROR,
        severity: "error",
        messages: errorMessages,
        date: Date.now()
    }
}

export function getMeetingListPageSuccess(pageNumber, meetingListPage, totalPages) {
    return {
        type: GET_MEETING_LIST_PAGE_SUCCESS,
        meetingListPage: meetingListPage,
        pageNumber: pageNumber,
        totalPages: totalPages
    }
}

export function getMeetingListPageError() {
    return {
        type: GET_MEETING_LIST_PAGE_ERROR,
        errorMsg: "Une erreur est survenue"
    }
}

export function createMeeting(meeting) {
    
    return async (dispatch) => {

        meeting.startDateTime = roundToNearestMinutes(meeting.startDateTime)
        meeting.endDateTime = roundToNearestMinutes(meeting.endDateTime)
        meeting.startDateTime = convertUTCDateToLocalDate(meeting.startDateTime);
        meeting.endDateTime = convertUTCDateToLocalDate(meeting.endDateTime);

        const meetingJson = JSON.stringify(meeting);

        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            await axios.post(
                "http://localhost:8081/api/meetings",
                meetingJson,
                { headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${accessToken}` } }
            )

            dispatch(meetingCreationSuccess());
            return true
        } catch (error) {            
            const errorMessages = listServerErrors(error.response);
            dispatch(meetingCreationError(errorMessages))
            return false
        }
    }
}

export function getMeetingListPage(pageNumber) {
    return async (dispatch) => {
        try {
            const accessToken = getTokenFromLocalStorage("access_token");
            const config = {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            const pageSize = 3;
            const response = await axios.get(`http://localhost:8081/api/meetings?page=${pageNumber}&size=${pageSize}`, config);
            const meetingListPage = response.data.content;
            const totalPages = response.data.totalPages;
            dispatch(getMeetingListPageSuccess(pageNumber, meetingListPage, totalPages))
        } catch {           
            dispatch(getMeetingListPageError());
        }
    }
}