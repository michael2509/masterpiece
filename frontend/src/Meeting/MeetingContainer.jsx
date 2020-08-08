import React, { Component } from 'react';
import MeetingList from './MeetingList';
import AddMeeting from './AddMeeting';
import { createMeeting, getMeetingListPage } from "./meetingActions";
import { connect } from "react-redux";
import { isLogged } from '../Auth/authService';

class MeetingContainer extends Component {

    componentDidMount() {
        const { getMeetingListPage, meetings } = this.props;
        const { currentPage } = meetings;

        getMeetingListPage(currentPage);
    }

    render() {
        const { createMeeting, getMeetingListPage, meetings, history } = this.props;
        const { meetingListPage } = meetings;
        const { currentPage } = meetings;

        const logged = isLogged();

        if (!logged) {
            history.push("/connexion")
        }

        return (
            <div>
                <MeetingList meetingListPage={meetingListPage} getMeetingListPage={getMeetingListPage} />
                <AddMeeting createMeeting={createMeeting} getMeetingListPage={getMeetingListPage} currentPage={currentPage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    meetings: state.meetings
});

const mapDispatchToProps = (dispatch) => ({
    createMeeting: (meeting) => dispatch(createMeeting(meeting)),
    getMeetingListPage: (currentPage) => dispatch(getMeetingListPage(currentPage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingContainer);